import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import { BACKEND_URL, ERROR_MESSAGES, RESPONSE_MESSAGES } from '@/configuration/index';
import deleteCookie from '@/utilities/delete-cookie';
import deleteToken from '@/utilities/delete-token';
import getProtectedSSP from '@/utilities/get-protected-ssp';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import styles from '@/styles/Home.module.css';

import UpdateAccountForm from './components/UpdateAccountForm';

interface DataCollection<T> {
  firstName: T;
  lastName: T;
}

export const getServerSideProps: GetServerSideProps = (context): any => getProtectedSSP(context);

export default function UpdateAccount({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  const router = useRouter();

  const [data, setData] = useState<DataCollection<string>>({
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState<DataCollection<boolean>>({
    firstName: false,
    lastName: false,
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

    setLoading(true);

    try {
      await axios({
        data: {
          firstName: trimmedValues.firstName,
          lastName: trimmedValues.lastName,
        },
        headers: {
          Authorization: token,
        },
        method: 'PATCH',
        url: `${BACKEND_URL}/api/user/name`,
      });

      setLoading(false);
      return handleUnauthorized();
    } catch (error) {
      setLoading(false);

      const { response: { data: errorData = {} } = {} } = error;
      const { info = '' } = errorData;
      if (info === RESPONSE_MESSAGES.missingData) {
        return setFormError(ERROR_MESSAGES.missingData);
      }
      if (info === RESPONSE_MESSAGES.imageRecordNotFound
        || info === RESPONSE_MESSAGES.passwordRecordNotFound) {
        return handleUnauthorized();
      }
      if (info === RESPONSE_MESSAGES.oldPasswordIsInvalid) {
        setErrors((state) => ({
          ...state,
          oldPassword: true,
        }));
        return setFormError(ERROR_MESSAGES.oldPasswordIsInvalid);
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
          Update Account
        </h1>
        <UpdateAccountForm
          firstName={data.firstName}
          firstNameError={errors.firstName}
          formError={formError}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          lastName={data.lastName}
          lastNameError={errors.lastName}
          loading={loading}
        />
      </div>
    </>
  );
}
