import React, { useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { BACKEND_URL, ERROR_MESSAGES } from '@/configuration/index';
import getAuthSSP from '@/utilities/get-auth-ssp';
import LinkButton from '@/components/LinkButton';
import Loader from '@/components/Loader';
import styles from '@/styles/Auth.module.css';
import { ValidateDataCollection } from '@/@types/validate';

import NewPasswordForm from './components/NewPasswordForm';

export const getServerSideProps: GetServerSideProps = (context): any => getAuthSSP(context);

export default function Validate(): React.ReactElement {
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

    const keys = Object.keys(data);
    const trimmedValues = keys.reduce(
      (obj, key) => ({ ...obj, [key]: data[key].trim() }),
      {} as ValidateDataCollection<string>,
    );
    if (Object.values(trimmedValues).includes('')) {
      const inputErrors = keys.reduce(
        (obj, key) => ({ ...obj, [key]: !trimmedValues[key] }),
        {} as ValidateDataCollection<boolean>,
      );
      setErrors(inputErrors);
      return setFormError(ERROR_MESSAGES.pleaseProvideData);
    }

    if (trimmedValues.password !== trimmedValues.passwordConfirmation) {
      setErrors({
        password: true,
        passwordConfirmation: true,
      });
      return setFormError(ERROR_MESSAGES.invalidPasswordConfirmation);
    }

    setLoading(true);

    try {
      await axios({
        data: {
          code,
          password: trimmedValues.password,
        },
        method: 'POST',
        url: `${BACKEND_URL}/api/auth/recovery/validate`,
      });

      return setCodeAccepted(true);
    } catch (error) {
      const { response: { data: errorData = {} } = {} } = error;
      const { status = null } = errorData;
      if (status && status === 400) {
        return setFormError(ERROR_MESSAGES.missingData);
      }

      if (status && status === 401) {
        return setFormError(ERROR_MESSAGES.invalidRecoveryLink);
      }

      return setFormError(ERROR_MESSAGES.oops);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      { loading && (
        <Loader />
      ) }
      <div className={styles.content}>
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
          classes={['mt-3']}
          disabled={loading}
          onClick={handleBackButton}
          text="Back"
        />
      </div>
    </>
  );
}
