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
    <>
      <Head>
        <meta
          content="width=device-width, initial-scale=1"
          name="viewport"
        />
        <link
          href="/favicon.ico"
          rel="icon"
        />
        <title>
          Deepseen
        </title>
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
    </>
  );
}

export default memo(Index);
