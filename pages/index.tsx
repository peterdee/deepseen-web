import React, { memo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import LinkButton from '@/components/LinkButton';

import styles from '@/styles/Index.module.css';

function Index() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Deepseen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="centered noselect">
        <div className={styles.logoContainer}>
          <div className={styles.logo} />
        </div>
        <h1 className="text-center">
          Deepseen web application is under construction
        </h1>
        <div className="row justify-content-center mt-16">
          <LinkButton
            onClick={() => router.push('/signin')}
            text="Sign in"
          />
          <span className="ml-16 mr-16">|</span>
          <LinkButton
            onClick={() => router.push('/signup')}
            text="Sign up"
          />
        </div>
      </main>
    </div>
  );
}

export default memo(Index);
