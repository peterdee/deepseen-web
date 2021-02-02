import React, { memo } from 'react';
import Head from 'next/head';

import styles from '@/styles/Index.module.css';

function Index() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Deepseen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="centered noselect">
        <h1>
          Deepseen web application is under construction
        </h1>
        <div className="row justify-content-center mt-16">
          <a href="/signup">
            Sign up
          </a>
          <span className="ml-16 mr-16">|</span>
          <a href="/signin">
            Sign in
          </a>
        </div>
      </main>
    </div>
  );
}

export default memo(Index);
