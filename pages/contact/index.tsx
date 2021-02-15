import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import {
  BACKEND_URL,
  ERROR_MESSAGES,
} from '@/configuration/index';
import getCommonSSP from '@/utilities/get-common-ssp';
import { getData } from '@/utilities/data-actions';
import Header from '@/components/Header';
import LinkButton from '@/components/LinkButton';
import Loader from '@/components/Loader';
import ModalFrame from '@/components/ModalFrame';
import { User } from '@/@types/user';

import ContactForm from './components/ContactForm';
// import styles from './Contact.module.css';

interface DataCollection<T> {
  email: T;
  message: T;
  name: T;
}

export const getServerSideProps: GetServerSideProps = (context): any => getCommonSSP(context);

export default function Contact({
  authenticated,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  const [data, setData] = useState<DataCollection<string>>({
    email: '',
    message: '',
    name: '',
  });
  const [errors, setErrors] = useState<DataCollection<boolean>>({
    email: false,
    message: false,
    name: false,
  });
  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(
    () => {
      if (authenticated) {
        const user = getData<User>('user');
        if (user) {
          setData({
            email: user.email || '',
            message: '',
            name: `${user.firstName || ''} ${user.lastName || ''}`,
          });
        }
      }
    },
    [],
  );

  const router = useRouter();

  const closeModal = () => setShowModal(false);

  const handleBackButton = () => router.back();

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

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const trimmedValues = {
      email: data.email.trim(),
      message: data.message.trim(),
      name: data.name.trim(),
    };
    if (!(trimmedValues.email && trimmedValues.message && trimmedValues.name)) {
      const inputErrors = Object.keys(errors).reduce(
        (obj, key) => ({ ...obj, [key]: !trimmedValues[key] }),
        {} as DataCollection<boolean>,
      );
      setErrors(inputErrors);
      return setFormError(ERROR_MESSAGES.pleaseProvideData);
    }

    setLoading(true);

    try {
      await axios({
        data: trimmedValues,
        method: 'POST',
        url: `${BACKEND_URL}/api/contact`,
      });

      setLoading(false);
      return setMessageSent(true);
    } catch (error) {
      setLoading(false);

      const { response: { data: errorData = {} } = {} } = error;
      const { status = null } = errorData;
      if (status && status === 429) {
        setFormError('');
        return setShowModal(true);
      }

      return setFormError(ERROR_MESSAGES.oops);
    }
  };

  return (
    <>
      <Header authenticated={authenticated} />
      { loading && (
        <Loader />
      ) }
      { showModal && (
        <ModalFrame
          closeModal={closeModal}
          message={ERROR_MESSAGES.tooManyRequests}
        />
      ) }
      <div className="col content">
        { messageSent && (
          <h1 className="text-center noselect">
            Your message has been sent!
          </h1>
        ) }
        { !messageSent && (
          <>
            <div className="content-header noselect">
              CONTACT
            </div>
            <ContactForm
              email={data.email}
              emailError={errors.email}
              formError={formError}
              handleInput={handleInput}
              handleSubmit={handleSubmit}
              loading={loading}
              message={data.message}
              messageError={errors.message}
              name={data.name}
              nameError={errors.name}
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
