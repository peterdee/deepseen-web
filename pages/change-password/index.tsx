import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import {
  BACKEND_URL,
  ERROR_MESSAGES,
} from '@/configuration/index';
import deleteCookie from '@/utilities/delete-cookie';
import deleteToken from '@/utilities/delete-token';
import getProtectedSSP from '@/utilities/get-protected-ssp';
import Header from '@/components/Header';
import styles from '@/styles/Home.module.css';

import ChangePasswordForm from './components/ChangePasswordForm';

interface DataCollection<T> {
  confirmNewPassword: T;
  newPassword: T;
  oldPassword: T;
}

export const getServerSideProps: GetServerSideProps = (context): any => getProtectedSSP(context);

export default function ChangePassword({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  const router = useRouter();

  const [data, setData] = useState<DataCollection<string>>({
    confirmNewPassword: '',
    newPassword: '',
    oldPassword: '',
  });
  const [errors, setErrors] = useState<DataCollection<boolean>>({
    confirmNewPassword: false,
    newPassword: false,
    oldPassword: false,
  });
  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordUpdated, setPasswordUpdated] = useState<string>('');

  const handleUnauthorized = useCallback(
    () => {
      deleteCookie();
      deleteToken();
      router.push('/signin');
    },
    [router],
  );

  useEffect(
    () => {
      if (!token) {
        handleUnauthorized();
      }
    },
    [],
  );

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
    setPasswordUpdated('');
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    setFormError('');
    setPasswordUpdated('');

    const keys = Object.keys(data);
    const trimmedValues = keys.reduce(
      (obj, key) => ({ ...obj, [key]: data[key].trim() }),
      {} as DataCollection<string>,
    );
    if (Object.values(trimmedValues).includes('')) {
      const inputErrors = keys.reduce(
        (obj, key) => ({ ...obj, [key]: !trimmedValues[key] }),
        {} as DataCollection<boolean>,
      );
      setErrors(inputErrors);
      return setFormError(ERROR_MESSAGES.pleaseProvideData);
    }

    setLoading(true);

    try {
      await axios({
        data: {
          newPassword: trimmedValues.newPassword,
          oldPassword: trimmedValues.oldPassword,
        },
        headers: {
          Authorization: token,
        },
        method: 'PATCH',
        url: `${BACKEND_URL}/api/user/password`,
      });

      return setPasswordUpdated('Password updated!');
    } catch (error) {
      // TODO: error handling
      const { response: { data: errorData = {} } = {} } = error;
      const { status = null } = errorData;
      if (status && status === 429) {
        setFormError('');
        // return setShowModal(true);
      }

      return setFormError(ERROR_MESSAGES.oops);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header authenticated={!!token} />
      <div className={styles.homeContainer}>
        <h1 className={`${styles.homeHeader} noselect`}>
          Change Password
        </h1>
        <ChangePasswordForm
          confirmNewPassword={data.confirmNewPassword}
          confirmNewPasswordError={errors.confirmNewPassword}
          formError={formError}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          loading={loading}
          newPassword={data.newPassword}
          newPasswordError={errors.newPassword}
          oldPassword={data.oldPassword}
          oldPasswordError={errors.oldPassword}
          passwordUpdated={passwordUpdated}
        />
      </div>
    </>
  );
}
