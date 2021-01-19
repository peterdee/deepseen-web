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

      <main className={styles.main}>
        <a href="/signup">
          Sign up
        </a>
      </main>

      <footer className={styles.footer}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Footer
        </a>
      </footer>
    </div>
  );
}

export default memo(Index);
