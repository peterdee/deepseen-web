import React, { useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import AuthErrorModal from '@/components/AuthErrorModal';
import {
  BACKEND_URL,
  CLIENT_TYPE,
  ERROR_MESSAGES,
  RESPONSE_MESSAGES,
} from '@/configuration/index';
import getAuthSSP from '@/utilities/get-auth-ssp';
import LinkButton from '@/components/LinkButton';
import Loader from '@/components/Loader';
import { saveData } from '@/utilities/data-actions';
import saveToken from '@/utilities/save-token';
import setCookie from '@/utilities/set-cookie';
import { SignInDataCollection } from '@/@types/signin';

import SignInForm from './components/SignInForm';
import styles from './SignIn.module.css';

export const getServerSideProps: GetServerSideProps = (context): any => getAuthSSP(context);

export default function SignIn() {
  const [data, setData] = useState<SignInDataCollection<string>>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<SignInDataCollection<boolean>>({
    email: false,
    password: false,
  });
  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const router = useRouter();

  const closeModal = () => setShowModal(false);

  const handleBackButton = () => router.back();
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
        {} as SignInDataCollection<boolean>,
      );
      setErrors(inputErrors);
      return setFormError(ERROR_MESSAGES.pleaseProvideData);
    }

    setLoading(true);
    const noErrors = Object.keys(errors).reduce(
      (obj, key) => ({ ...obj, [key]: false }),
      {} as SignInDataCollection<boolean>,
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
        return setFormError(ERROR_MESSAGES.oops);
      }

      const { token, user } = responseData;

      // set token as cookie & save token in localStorage
      setCookie(token);
      saveData('user', user);
      saveToken(token);

      return router.push('/home');
    } catch (error) {
      setLoading(false);
      const { response: { data: errorData = {} } = {} } = error;
      if (errorData.info && errorData.status) {
        const { info, status } = errorData;
        if (info === RESPONSE_MESSAGES.missingData && status === 400) {
          return setFormError(ERROR_MESSAGES.missingData);
        }
        if (info === RESPONSE_MESSAGES.accessDenied && status === 401) {
          return setFormError(ERROR_MESSAGES.accessDenied);
        }
        if (info === RESPONSE_MESSAGES.tooManyRequests && status === 429) {
          setFormError('');
          return setShowModal(true);
        }
      }

      return setFormError(ERROR_MESSAGES.oops);
    }
  };

  return (
    <>
      { loading && (
        <Loader />
      ) }
      { showModal && (
        <AuthErrorModal
          closeModal={closeModal}
          message={ERROR_MESSAGES.tooManyRequests}
        />
      ) }
      <div className={`col ${styles.content}`}>
        <div className={`${styles.header} noselect`}>
          SIGN IN
        </div>
        <SignInForm
          email={data.email}
          emailError={errors.email}
          formError={formError}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          loading={loading}
          password={data.password}
          passwordError={errors.password}
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
