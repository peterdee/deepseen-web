import React, { useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { BACKEND_URL } from '@/configuration/index';
import getAuthSSP from '@/utilities/get-auth-ssp';
import LinkButton from '@/components/LinkButton';
import Loader from '@/components/Loader';

import EmailForm from './components/EmailForm';
import styles from './Recovery.module.css';

export const getServerSideProps: GetServerSideProps = (context): any => getAuthSSP(context);

export default function Recovery() {
  const [linkSent, setLinkSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleBackButton = () => router.back();

  const handleInput = (value: string): void => {
    setEmail(value);
    setFormError('');
  };

  const handleSubmit = async (event: React.FormEvent): Promise<any> => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return setFormError('Please provide the necessary data!');
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

      setLoading(false);
      return setLinkSent(true);
    } catch (error) {
      setLoading(false);

      const { response: { data = {} } = {} } = error;
      const { status = null } = data;
      if (status && status === 401) {
        return setFormError('Account not found!');
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
          classes={['mt-16']}
          disabled={loading}
          onClick={handleBackButton}
          text="Back"
        />
      </div>
    </>
  );
}
