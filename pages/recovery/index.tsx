import React, { useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import { useRouter } from 'next/router';

import {
  BACKEND_URL,
  COOKIE_NAME,
} from '../../configuration';
import styles from './Recovery.module.css';

import EmailForm from './components/EmailForm';
import LinkButton from '../../components/LinkButton';
import Loader from '../../components/Loader';

// TODO: move this part to the separate file
export const getServerSideProps: GetServerSideProps = (context): any => {
  const cookies = context.req.headers.cookie;
  if (cookies) {
    try {
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

export default function Recovery() {
  const [linkSent, setLinkSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleBackButton = () => router.push('/');

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

      // TODO: handle error responses

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
          ACCOUNT RECOVERY
        </div>
        { linkSent && (
          <div>
            {`Account recovery link sent to ${email}!`}
          </div>
        ) }
        { !linkSent && (
          <EmailForm
            email={email}
            formError={formError}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            loading={loading}
          />
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
