import React, { memo } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import getCommonSSP from '@/utilities/get-common-ssp';
import Header from '@/components/Header';
import styles from '@/styles/Index.module.css';

export const getServerSideProps: GetServerSideProps = (context): any => getCommonSSP(context);

function Index({
  authenticated,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
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
