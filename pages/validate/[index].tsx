import React, { useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { BACKEND_URL } from '@/configuration/index';
import getAuthSSP from '@/utilities/get-auth-ssp';
import LinkButton from '@/components/LinkButton';
import Loader from '@/components/Loader';
import { ValidateDataCollection } from '@/@types/validate';

import NewPasswordForm from './components/NewPasswordForm';
import styles from './Validate.module.css';

export const getServerSideProps: GetServerSideProps = (context): any => getAuthSSP(context);

export default function Validate() {
  const router = useRouter();
  const { index: code = '' } = router.query;

  const [codeAccepted, setCodeAccepted] = useState<boolean>(false);
  const [data, setData] = useState<ValidateDataCollection<string>>({
    password: '',
    passwordConfirmation: '',
  });
  const [errors, setErrors] = useState<ValidateDataCollection<boolean>>({
    password: false,
    passwordConfirmation: false,
  });
  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleBackButton = () => router.push('/');

  const handleInput = (value: string, name: string): void => {
    setData((state) => ({
      ...state,
      [name]: value,
    }));
    setErrors((state) => ({
      ...state,
      [name]: false,
    }));
    setFormError('');
  };

  const handleSubmit = async (event: React.FormEvent): Promise<any> => {
    event.preventDefault();

    const trimmed = {
      password: data.password.trim(),
      passwordConfirmation: data.passwordConfirmation.trim(),
    };

    if (!(trimmed.password && trimmed.passwordConfirmation)) {
      const inputErrors = Object.keys(errors).reduce(
        (obj, key) => ({ ...obj, [key]: !trimmed[key] }),
        {} as ValidateDataCollection<boolean>,
      );
      setErrors(inputErrors);
      return setFormError('Please provide the necessary data!');
    }

    if (trimmed.password !== trimmed.passwordConfirmation) {
      setErrors({
        password: true,
        passwordConfirmation: true,
      });
      return setFormError('Password confirmation is invalid!');
    }

    setLoading(true);

    try {
      await axios({
        data: {
          code,
          password: trimmed.password,
        },
        method: 'POST',
        url: `${BACKEND_URL}/api/auth/recovery/validate`,
      });

      setLoading(false);
      return setCodeAccepted(true);
    } catch (error) {
      setLoading(false);

      const { response: { data: errorData = {} } = {} } = error;
      const { status = null } = errorData;
      if (status && status === 400) {
        return setFormError('Missing required data!');
      }

      if (status && status === 401) {
        return setFormError('Recovery link is invalid!');
      }

      return setFormError('Oops! Something went wrong!');
    }
  };

  return (
    <>
      { loading && (
        <Loader />
      ) }
      <div className={`col ${styles.content}`}>
        { codeAccepted && (
          <h1 className="text-center noselect">
            Your password is updated!
          </h1>
        ) }
        { !codeAccepted && (
          <>
            <div className={`${styles.header} noselect`}>
              SET NEW PASSWORD
            </div>
            <NewPasswordForm
              formError={formError}
              handleInput={handleInput}
              handleSubmit={handleSubmit}
              loading={loading}
              password={data.password}
              passwordConfirmation={data.password}
              passwordConfirmationError={errors.passwordConfirmation}
              passwordError={errors.password}
            />
          </>
        ) }
        <LinkButton
          classes={['mt-16']}
          disabled={loading}
          onClick={handleBackButton}
          text="Back"
        />
      </div>
    </>
  );
}
