import React, { memo } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { parse } from 'cookie';

import { COOKIE_NAME } from '@/configuration/index';
import Header from '@/components/Header';
import styles from '@/styles/Index.module.css';

export const getServerSideProps: GetServerSideProps = async (context): Promise<any> => {
  const cookies = context.req.headers.cookie;
  if (!cookies) {
    return {
      props: {
        authenticated: false,
      },
    };
  }

  try {
    const parsedCookies = parse(cookies);
    if (!(parsedCookies && parsedCookies[COOKIE_NAME])) {
      return {
        authenticated: false,
      };
    }

    return {
      props: {
        authenticated: true,
      },
    };
  } catch {
    return {
      props: {
        authenticated: false,
      },
    };
  }
};

function Index({ authenticated }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Deepseen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header authenticated={authenticated} />
      <main className="centered noselect">
        <div className={styles.logoContainer}>
          <div className={styles.logo} />
        </div>
        <h1 className="text-center">
          Deepseen web application is under construction
        </h1>
      </main>
    </div>
  );
}

export default memo(Index);
