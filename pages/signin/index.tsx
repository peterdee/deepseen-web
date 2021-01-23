import React, { useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import { useRouter } from 'next/router';

import {
  BACKEND_URL,
  CLIENT_TYPE,
  COOKIE_NAME,
  RESPONSE_MESSAGES,
} from '../../configuration';
import { Data, Errors } from './types';
import saveToken from '../../utilities/save-token';
import setCookie from '../../utilities/set-cookie';
import styles from './SignIn.module.css';

import LinkButton from '../../components/LinkButton';
import Loader from '../../components/Loader';
import SignInForm from './components/SignInForm';

export const getServerSideProps: GetServerSideProps = (context): any => {
  const cookies = context.req.headers.cookie;
  if (cookies) {
    try {
      // make sure that token exists
      const parsedCookies = parse(cookies);
      if (parsedCookies && parsedCookies[COOKIE_NAME]) {
        return {
          redirect: {
            destination: '/home',
            permanent: false,
          },
        };
      }
    } catch {
      return {
        props: {},
      };
    }
  }

  return {
    props: {},
  };
};

export default function SignIn() {
  const [data, setData] = useState<Data>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Errors>({
    email: false,
    password: false,
  });
  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleBackButton = () => router.push('/');
  const handleCreateAccountButton = () => router.push('/signup');
  const handleForgotPasswordButton = () => router.push('/recovery');

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
      email: data.email.trim(),
      password: data.password.trim(),
    };
    if (!(trimmed.email && trimmed.password)) {
      const inputErrors = Object.keys(errors).reduce(
        (obj, key) => ({ ...obj, [key]: !trimmed[key] }),
        {} as Errors,
      );
      setErrors(inputErrors);
      return setFormError('Please provide the necessary data!');
    }

    setLoading(true);
    const noErrors = Object.keys(errors).reduce(
      (obj, key) => ({ ...obj, [key]: false }),
      {} as Errors,
    );
    setErrors(noErrors);

    try {
      const response = await axios({
        data: {
          client: CLIENT_TYPE,
          email: trimmed.email,
          password: trimmed.password,
        },
        method: 'POST',
        url: `${BACKEND_URL}/api/auth/signin`,
      });

      setLoading(false);
      const { data: { data: responseData = {} } = {} } = response;
      if (!(responseData.token && responseData.user)) {
        return setFormError('Oops! Something went wrong!');
      }

      const { token } = responseData;

      // set token as cookie & save token in localStorage
      setCookie(token);
      saveToken(token);

      return router.push('/home');
    } catch (error) {
      setLoading(false);
      const { response: { data: errorData = {} } = {} } = error;
      if (errorData.info && errorData.status) {
        const { info, status } = errorData;
        if (info === RESPONSE_MESSAGES.missingData && status === 400) {
          return setFormError('Missing required data!');
        }
        if (info === RESPONSE_MESSAGES.accessDenied && status === 401) {
          return setFormError('Access denied!');
        }
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
        <div className={`${styles.header} noselect`}>
          SIGN IN
        </div>
        <SignInForm
          email={data.email}
          errors={errors}
          formError={formError}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          loading={loading}
          password={data.password}
        />
        <LinkButton
          classes={['mt-16']}
          disabled={loading}
          onClick={handleForgotPasswordButton}
          text="Forgot password?"
        />
        <LinkButton
          classes={['mt-16']}
          disabled={loading}
          onClick={handleCreateAccountButton}
          text="Don't have an account?"
        />
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