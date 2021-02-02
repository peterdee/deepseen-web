import React, { useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { BACKEND_URL, CLIENT_TYPE, RESPONSE_MESSAGES } from '@/configuration/index';
import getAuthSSP from '@/utilities/get-auth-ssp';
import LinkButton from '@/components/LinkButton';
import Loader from '@/components/Loader';
import saveToken from '@/utilities/save-token';
import setCookie from '@/utilities/set-cookie';
import { SignUpDataCollection } from '@/@types/signup';

import SignUpForm from './components/SignUpForm';
import styles from './SignUp.module.css';

export const getServerSideProps: GetServerSideProps = (context): any => getAuthSSP(context);

export default function SignUp() {
  const [data, setData] = useState<SignUpDataCollection<string>>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmation: '',
  });
  const [errors, setErrors] = useState<SignUpDataCollection<boolean>>({
    email: false,
    firstName: false,
    lastName: false,
    password: false,
    passwordConfirmation: false,
  });
  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleBackButton = () => router.push('/');
  const handleHaveAccountButton = () => router.push('/signin');

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
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      password: data.password.trim(),
      passwordConfirmation: data.passwordConfirmation.trim(),
    };
    if (!(trimmed.email && trimmed.firstName && trimmed.lastName
      && trimmed.password && trimmed.passwordConfirmation)) {
      const inputErrors = Object.keys(errors).reduce(
        (obj, key) => ({ ...obj, [key]: !trimmed[key] }),
        {} as SignUpDataCollection<boolean>,
      );
      setErrors(inputErrors);
      return setFormError('Please provide the necessary data!');
    }

    if (trimmed.password !== trimmed.passwordConfirmation) {
      setErrors((state) => ({
        ...state,
        password: true,
        passwordConfirmation: true,
      }));
      return setFormError('Password confirmation is invalid!');
    }

    setLoading(true);
    const noErrors = Object.keys(errors).reduce(
      (obj, key) => ({ ...obj, [key]: false }),
      {} as SignUpDataCollection<boolean>,
    );
    setErrors(noErrors);

    try {
      const response = await axios({
        data: {
          client: CLIENT_TYPE,
          email: trimmed.email,
          firstName: trimmed.firstName,
          lastName: trimmed.lastName,
          password: trimmed.password,
        },
        method: 'POST',
        url: `${BACKEND_URL}/api/auth/signup`,
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
        if (info === RESPONSE_MESSAGES.emailAlreadyInUse && status === 400) {
          setErrors((state) => ({
            ...state,
            email: true,
          }));
          return setFormError('Email address is already in use!');
        }
        if (info === RESPONSE_MESSAGES.invalidData && status === 400) {
          return setFormError('Provided data is invalid!');
        }
        if (info === RESPONSE_MESSAGES.missingData && status === 400) {
          return setFormError('Missing required data!');
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
          SIGN UP
        </div>
        <SignUpForm
          data={data}
          errors={errors}
          formError={formError}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <LinkButton
          classes={['mt-16']}
          disabled={loading}
          onClick={handleHaveAccountButton}
          text="Already have an account?"
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
