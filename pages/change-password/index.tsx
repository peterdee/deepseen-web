import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import { BACKEND_URL, ERROR_MESSAGES } from '@/configuration/index';
import deleteCookie from '@/utilities/delete-cookie';
import deleteToken from '@/utilities/delete-token';
import getProtectedSSP from '@/utilities/get-protected-ssp';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import styles from '@/styles/Home.module.css';

import ChangePasswordForm from './components/ChangePasswordForm';
import changePasswordStyles from './ChangePassword.module.css';

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

  const handleUnauthorized = useCallback(
    (): void => {
      deleteCookie();
      deleteToken();
      router.push('/signin');
    },
    [router],
  );

  useEffect(
    (): void => {
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
    return setFormError('');
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    setFormError('');

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

    if (trimmedValues.confirmNewPassword !== trimmedValues.newPassword) {
      setErrors((state) => ({
        ...state,
        confirmNewPassword: true,
        newPassword: true,
      }));
      return setFormError(ERROR_MESSAGES.invalidPasswordConfirmation);
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

      setLoading(false);
      return handleUnauthorized();
    } catch (error) {
      setLoading(false);

      // TODO: error handling
      const { response: { data: errorData = {} } = {} } = error;
      const { status = null } = errorData;
      if (status && status === 429) {
        setFormError('');
        // return setShowModal(true);
      }

      return setFormError(ERROR_MESSAGES.oops);
    }
  };

  return (
    <>
      { loading && (
        <Loader />
      ) }
      <Header authenticated={!!token} />
      <div className={styles.homeContainer}>
        <h1 className={`${styles.homeHeader} noselect`}>
          Change Password
        </h1>
        <p className={`${changePasswordStyles.warning} noselect`}>
          Changing the password will sign you out on all of the devices!
        </p>
        <p className={`${changePasswordStyles.warning} noselect`}>
          Already existing sessions will not be affected.
        </p>
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
        />
      </div>
    </>
  );
}
