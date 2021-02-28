import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import getCommonSSP from '@/utilities/get-common-ssp';
import Header from '@/components/Header';
import styles from '@/styles/Home.module.css';

export const getServerSideProps: GetServerSideProps = (context): any => getCommonSSP(context);

export default function UserAgreement({
  authenticated,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  return (
    <>
      <Header authenticated={authenticated} />
      <div className={`${styles.homeContainer} noselect`}>
        <h1 className={styles.homeHeader}>
          User Agreement
        </h1>
        <div className="mt-2 fw-bold">
          Data usage acknowledgement
        </div>
        <div>
          This application collects the following user data:
          <ul>
            <li>
              email address
            </li>
            <li>
              first name
            </li>
            <li>
              last name
            </li>
          </ul>
        </div>
        <div>
          Email address is required for the authorization purposes.
        </div>
        <div>
          It is allowed to use a non-existent email address, though it is recommended to use
          a real one.
        </div>
        <div>
          If you use an invalid email address, you will not be able to recover your account
          if you lose an access to it.
        </div>
        <div className="mt-1">
          First name and last name are not validated, any name can be used.
        </div>
        <div className="mt-1">
          Collected data is not used for any other purposes other than the Deepseen
          platform usage.
        </div>
        <div>
          Registered users can delete their account if necessary at any time, this function
          is available on the Home page.
        </div>
        <div className="mt-2 fw-bold">
          Service usage acknowledgement
        </div>
        <div>
          Deepseen and its author does not provide any guarantees that the services are going
          to work properly.
        </div>
        <div>
          The author of Deepseen does not get any financial gains from Deepseen.
        </div>
        <div>
          All of the Deepseen services are being deployed to the free environments, this can
          lead to the issues with the Deepseen services.
        </div>
      </div>
    </>
  );
}
