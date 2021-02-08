import React, { useEffect } from 'react';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { io, Socket } from 'socket.io-client';
import { parse } from 'cookie';
import { useRouter } from 'next/router';

import {
  BACKEND_URL,
  COOKIE_NAME,
  EVENTS,
  WEBSOCKETS_URL,
} from '@/configuration/index';
import deleteCookie from '@/utilities/delete-cookie';
import deleteToken from '@/utilities/delete-token';
import { saveData } from '@/utilities/data-actions';
import useRefState from '@/hooks/use-ref-state';

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

    const token = parsedCookies[COOKIE_NAME];
    const { data: { data: { user = {} } = {} } = {} } = await axios({
      headers: {
        Authorization: token,
      },
      method: 'GET',
      url: `${BACKEND_URL}/api/user`,
    });

    return {
      props: {
        account: user,
        token,
      },
    };
  } catch {
    return {
      props: {},
    };
  }
};

export default function Home(
  { account, token }: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [connection, setConnection] = useRefState({} as Socket);
  const router = useRouter();

  useEffect(
    () => {
      if (!account) {
        deleteCookie();
        deleteToken();
        router.push('/signin');
      } else {
        saveData('user', account);
      }
    },
    [],
  );

  useEffect(
    () => {
      const socket: Socket = io(
        WEBSOCKETS_URL,
        {
          autoConnect: true,
          query: {
            token,
          },
          reconnection: true,
          reconnectionAttempts: 10,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 10000,
        },
      );

      setConnection(socket);

      // TODO: add subscriptions for the incoming events

      return () => {
        // TODO: remove subscriptions

        socket.close();
      };
    },
    [],
  );

  const completeSignOut = async (): Promise<void> => {
    if (connection.current.connected) {
      console.log('is here')
      connection.current.emit(EVENTS.COMPLETE_LOGOUT);
    }

    try {
      await axios({
        headers: {
          Authorization: token,
        },
        method: 'GET',
        url: `${BACKEND_URL}/api/auth/signout/complete`,
      });
    } catch {
      deleteCookie();
      deleteToken();
    } finally {
      deleteCookie();
      deleteToken();
      router.push('/signin');
    }
  };

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
      <button
        onClick={completeSignOut}
        type="button"
      >
        COMPLETE SIGN OUT
      </button>
    </div>
  );
}
