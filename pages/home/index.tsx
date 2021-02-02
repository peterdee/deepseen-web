import React, { useEffect } from 'react';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parse } from 'cookie';
import { useRouter } from 'next/router';

import { BACKEND_URL, COOKIE_NAME } from '@/configuration/index';
import deleteCookie from '@/utilities/delete-cookie';
import deleteToken from '@/utilities/delete-token';

const redirect = {
  destination: '/signin',
  permanent: false,
};

export const getServerSideProps: GetServerSideProps = async (context): Promise<any> => {
  const cookies = context.req.headers.cookie;
  if (!cookies) {
    return {
      redirect,
    };
  }

  try {
    const parsedCookies = parse(cookies);
    if (!(parsedCookies && parsedCookies[COOKIE_NAME])) {
      return {
        redirect,
      };
    }

    const { data: { data: { user = {} } = {} } = {} } = await axios({
      headers: {
        Authorization: parsedCookies[COOKIE_NAME],
      },
      method: 'GET',
      url: `${BACKEND_URL}/api/user`,
    });

    return {
      props: {
        account: user,
      },
    };
  } catch {
    return {
      props: {},
    };
  }
};

export default function Home(
  { account }: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();

  useEffect(
    () => {
      if (!account) {
        deleteCookie();
        deleteToken();
        router.push('/signin');
      }
    },
    [],
  );

  const signOut = (): Promise<boolean> => {
    deleteCookie();
    deleteToken();
    return router.push('/signin');
  };

  return (
    <div>
      <h1>
        This is Home
      </h1>
      <h2>
        { `Hello ${account.firstName} ${account.lastName}!` }
      </h2>
      <button
        onClick={() => router.push('/change-password')}
        type="button"
      >
        Change password
      </button>
      <button
        onClick={() => router.push('/update-profile')}
        type="button"
      >
        Update profile
      </button>
      <button
        onClick={signOut}
        type="button"
      >
        SIGN OUT
      </button>
    </div>
  );
}
