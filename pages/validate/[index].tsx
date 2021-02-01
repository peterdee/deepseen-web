import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { BACKEND_URL } from '../../configuration';
import getAuthSSP from '../../utilities/get-auth-ssp';
import styles from './Validate.module.css';

import NewPasswordForm from './components/NewPasswordForm';
import LinkButton from '../../components/LinkButton';
import Loader from '../../components/Loader';
import { DataCollection } from './types';

export const getServerSideProps: GetServerSideProps = (context): any => getAuthSSP(context);

export default function Validate() {
  const router = useRouter();
  const { index: code = '' } = router.query;

  useEffect(
    () => {
      if (!code) {
        router.push('/');
      }
    },
    [],
  );

  const [codeAccepted, setCodeAccepted] = useState<boolean>(false);
  const [data, setData] = useState<DataCollection<string>>({
    password: '',
    passwordConfirmation: '',
  });
  const [errors, setErrors] = useState<DataCollection<boolean>>({
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

    // TODO: finish this
    // const trimmedEmail = email.trim();
    // if (!trimmedEmail) {
    //   return setFormError('Please provide the necessary data!');
    // }

    setLoading(true);

    try {
      // await axios({
      //   data: {
      //     email: trimmedEmail,
      //   },
      //   method: 'POST',
      //   url: `${BACKEND_URL}/api/auth/recovery/send`,
      // });

      setLoading(false);
      return setCodeAccepted(true);
    } catch (error) {
      setLoading(false);

      // const { response: { data: errorData = {} } = {} } = error;
      // const { status = null } = errorData;
      // if (status && status === 401) {
      //   return setFormError('Account not found!');
      // }

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
          <div className={styles.result}>
            Your password is updated!
          </div>
        ) }
        { !codeAccepted && (
          <>
            <div className={`${styles.header} noselect`}>
              SET NEW PASSWORD
            </div>
            <div className={`${styles.header} noselect`}>
              {code}
            </div>
            <NewPasswordForm
              data={data}
              errors={errors}
              formError={formError}
              handleInput={handleInput}
              handleSubmit={handleSubmit}
              loading={loading}
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
