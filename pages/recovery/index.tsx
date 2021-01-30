import React, { useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import { useRouter } from 'next/router';

import {
  BACKEND_URL,
  CLIENT_TYPE,
  COOKIE_NAME,
} from '../../configuration';
import styles from './Recovery.module.css';

import EmailForm from './components/EmailForm';
import LinkButton from '../../components/LinkButton';
import Loader from '../../components/Loader';

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

export default function Recovery() {
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
          client: CLIENT_TYPE,
          email: trimmedEmail,
        },
        method: 'POST',
        url: `${BACKEND_URL}/api/`, // TODO: correct URL
      });

      setLoading(false);

      // TODO: show a message if everything's fine

      return router.push('/');
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
        <EmailForm
          email={email}
          formError={formError}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          loading={loading}
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
