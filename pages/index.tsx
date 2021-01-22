import React, { memo } from 'react';

import Head from 'next/head';
import styles from '../styles/Home.module.css';

function Index() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Deepseen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="row">
        <a href="/signup">
          Sign up
        </a>
        <span className="ml-16 mr-16">|</span>
        <a href="/signin">
          Sign in
        </a>
      </main>
    </div>
  );
}

export default memo(Index);
