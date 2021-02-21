import React, { useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { BACKEND_URL, ERROR_MESSAGES } from '@/configuration/index';
import getAuthSSP from '@/utilities/get-auth-ssp';
import LinkButton from '@/components/LinkButton';
import Loader from '@/components/Loader';
import ModalFrame from '@/components/ModalFrame';
import styles from '@/styles/Auth.module.css';

import EmailForm from './components/EmailForm';

export const getServerSideProps: GetServerSideProps = (context): any => getAuthSSP(context);

export default function Recovery(): React.ReactElement {
  const [linkSent, setLinkSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const router = useRouter();

  const closeModal = () => setShowModal(false);

  const handleBackButton = () => router.push('/');

  const handleInput = (value: string): void => {
    setEmail(value);
    return setFormError('');
  };

  const handleSubmit = async (event: React.FormEvent): Promise<any> => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return setFormError(ERROR_MESSAGES.pleaseProvideData);
    }

    setLoading(true);

    try {
      await axios({
        data: {
          email: trimmedEmail,
        },
        method: 'POST',
        url: `${BACKEND_URL}/api/auth/recovery/send`,
      });

      return setLinkSent(true);
    } catch (error) {
      const { response: { data = {} } = {} } = error;
      const { status = null } = data;
      if (status && status === 401) {
        return setFormError(ERROR_MESSAGES.accountNotFound);
      }
      if (status && status === 429) {
        setFormError('');
        return setShowModal(true);
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
        { linkSent && (
          <h1 className="text-center noselect">
            {`Account recovery link sent to ${email}!`}
          </h1>
        ) }
        { !linkSent && (
          <>
            <div className={`${styles.header} noselect`}>
              ACCOUNT RECOVERY
            </div>
            <EmailForm
              email={email}
              formError={formError}
              handleInput={handleInput}
              handleSubmit={handleSubmit}
              loading={loading}
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
