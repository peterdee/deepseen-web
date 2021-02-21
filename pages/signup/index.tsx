import React, { useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import {
  BACKEND_URL,
  CLIENT_TYPE,
  ERROR_MESSAGES,
  RESPONSE_MESSAGES,
} from '@/configuration/index';
import getAuthSSP from '@/utilities/get-auth-ssp';
import LinkButton from '@/components/LinkButton';
import Loader from '@/components/Loader';
import ModalFrame from '@/components/ModalFrame';
import { saveData } from '@/utilities/data-actions';
import saveToken from '@/utilities/save-token';
import setCookie from '@/utilities/set-cookie';
import { SignUpDataCollection } from '@/@types/signup';
import styles from '@/styles/Auth.module.css';
import { User } from '@/@types/user';

import SignUpForm from './components/SignUpForm';

export const getServerSideProps: GetServerSideProps = (context): any => getAuthSSP(context);

export default function SignUp(): React.ReactElement {
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
  const [showModal, setShowModal] = useState<boolean>(false);

  const router = useRouter();

  const closeModal = () => setShowModal(false);

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

    const keys = Object.keys(data);
    const trimmed = keys.reduce(
      (obj, key) => ({ ...obj, [key]: data[key].trim() }),
      {} as SignUpDataCollection<string>,
    );
    if (Object.values(trimmed).includes('')) {
      const inputErrors = keys.reduce(
        (obj, key) => ({ ...obj, [key]: !trimmed[key] }),
        {} as SignUpDataCollection<boolean>,
      );
      setErrors(inputErrors);
      return setFormError(ERROR_MESSAGES.pleaseProvideData);
    }

    if (trimmed.password !== trimmed.passwordConfirmation) {
      setErrors((state) => ({
        ...state,
        password: true,
        passwordConfirmation: true,
      }));
      return setFormError(ERROR_MESSAGES.invalidPasswordConfirmation);
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

      const { data: { data: responseData = {} } = {} } = response;
      if (!(responseData.token && responseData.user)) {
        return setFormError(ERROR_MESSAGES.oops);
      }

      const { token, user } = responseData;

      // set token as cookie & save token in localStorage
      setCookie(token);
      saveData<User>('user', user);
      saveToken(token);

      return router.push('/home');
    } catch (error) {
      const { response: { data: errorData = {} } = {} } = error;
      if (errorData.info && errorData.status) {
        const { info, status } = errorData;
        if (info === RESPONSE_MESSAGES.emailAlreadyInUse && status === 400) {
          setErrors((state) => ({
            ...state,
            email: true,
          }));
          return setFormError(ERROR_MESSAGES.emailAlreadyInUse);
        }
        if (info === RESPONSE_MESSAGES.invalidData && status === 400) {
          return setFormError(ERROR_MESSAGES.providedInvalidData);
        }
        if (info === RESPONSE_MESSAGES.missingData && status === 400) {
          return setFormError(ERROR_MESSAGES.missingData);
        }
        if (info === RESPONSE_MESSAGES.tooManyRequests && status === 429) {
          setFormError('');
          return setShowModal(true);
        }
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
      { showModal && (
        <ModalFrame
          closeModal={closeModal}
          message={ERROR_MESSAGES.tooManyRequests}
        />
      ) }
      <div className={styles.content}>
        <div className={`${styles.header} noselect`}>
          SIGN UP
        </div>
        <SignUpForm
          email={data.email}
          emailError={errors.email}
          firstName={data.firstName}
          firstNameError={errors.firstName}
          formError={formError}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          lastName={data.lastName}
          lastNameError={errors.lastName}
          loading={loading}
          password={data.password}
          passwordConfirmation={data.passwordConfirmation}
          passwordConfirmationError={errors.passwordConfirmation}
          passwordError={errors.password}
        />
        <LinkButton
          classes={['mt-3']}
          disabled={loading}
          onClick={handleHaveAccountButton}
          text="Already have an account?"
        />
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
