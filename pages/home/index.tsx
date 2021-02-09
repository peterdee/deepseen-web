import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { io, Socket } from 'socket.io-client';
import { parse } from 'cookie';
import { useRouter } from 'next/router';

import {
  BACKEND_URL,
  CLIENT_TYPES,
  COOKIE_NAME,
  ERROR_MESSAGES,
  EVENTS,
  WEBSOCKETS_URL,
} from '@/configuration/index';
import deleteCookie from '@/utilities/delete-cookie';
import deleteToken from '@/utilities/delete-token';
import {
  ClientDisconnectedData,
  NewClientConnectedData,
  RoomStatusData,
} from '@/@types/home';
import Header from '@/components/Header';
import ModalFrame from '@/components/ModalFrame';
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

export default function Home({
  account,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [connection, setConnection] = useRefState({} as Socket);
  const [desktopConnected, setDesktopConnected] = useState<boolean>(false);
  const [mobileConnected, setMobileConnected] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [webConnected, setWebConnected] = useState<boolean>(false);

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

  // handle incoming CLIENT_DISCONNECTED event
  const clientDisconnected = useCallback(
    (data: ClientDisconnectedData): void => {
      const { client = '' } = data;
      if (client === CLIENT_TYPES.desktop) {
        setDesktopConnected(false);
      }
      if (client === CLIENT_TYPES.mobile) {
        setMobileConnected(false);
      }
    },
    [setDesktopConnected, setMobileConnected],
  );

  // handle incoming connect event
  const connect = useCallback(
    (): void => setWebConnected(true),
    [setWebConnected],
  );

  // handle incoming connect_error event (happens if token is invalid)
  const connectError = useCallback(
    () => {
      if (connection?.current?.connected) {
        connection.current.disconnect();
      }

      setDesktopConnected(false);
      setMobileConnected(false);
      setWebConnected(false);
      setModalMessage(ERROR_MESSAGES.connectError);
      return setConnection({} as Socket);
    },
    [
      setConnection,
      setDesktopConnected,
      setMobileConnected,
      setModalMessage,
      setWebConnected,
    ],
  );

  // handle incoming disconnect event
  const disconnect = useCallback(
    (): void => {
      setDesktopConnected(false);
      setMobileConnected(false);
      setWebConnected(false);
    },
    [
      setDesktopConnected,
      setMobileConnected,
      setWebConnected,
    ],
  );

  // handle incoming INTERNAL_SERVER_ERROR event
  const internalServerError = useCallback(
    (): void => setModalMessage(ERROR_MESSAGES.oops),
    [setModalMessage],
  );

  // handle incoming NEW_CLIENT_CONNECTED event
  const newClientConnected = useCallback(
    (data: NewClientConnectedData): void => {
      const { client = '' } = data;
      if (client === CLIENT_TYPES.desktop) {
        setDesktopConnected(true);
      }
      if (client === CLIENT_TYPES.mobile) {
        setDesktopConnected(true);
      }
    },
    [setDesktopConnected, setMobileConnected],
  );

  // handle incoming ROOM_STATUS event
  const roomStatus = useCallback(
    ({ room }: RoomStatusData): boolean | void => {
      if (!(Array.isArray(room) && room.length > 0)) {
        return false;
      }

      const [desktop, mobile] = room.reduce(
        (arr, item) => {
          if (item.client === CLIENT_TYPES.desktop) {
            return [
              [...arr[0], item],
              [...arr[1]],
            ];
          }
          if (item.client === CLIENT_TYPES.mobile) {
            return [
              [...arr[0]],
              [...arr[1], item],
            ];
          }

          return arr;
        },
        [[], []],
      );

      if (desktop.length > 0) {
        setDesktopConnected(true);
      }
      if (mobile.length > 0) {
        setMobileConnected(true);
      }

      return false;
    },
    [setDesktopConnected, setMobileConnected],
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

      socket.on(EVENTS.CLIENT_DISCONNECTED, clientDisconnected);
      socket.on(EVENTS.connect, connect);
      socket.on(EVENTS.connect_error, connectError);
      socket.on(EVENTS.disconnect, disconnect);
      socket.on(EVENTS.INTERNAL_SERVER_ERROR, internalServerError);
      socket.on(EVENTS.NEW_CLIENT_CONNECTED, newClientConnected);
      socket.on(EVENTS.ROOM_STATUS, roomStatus);

      return () => {
        socket.off(EVENTS.CLIENT_DISCONNECTED, clientDisconnected);
        socket.off(EVENTS.connect, connect);
        socket.off(EVENTS.disconnect, disconnect);
        socket.off(EVENTS.INTERNAL_SERVER_ERROR, internalServerError);
        socket.off(EVENTS.NEW_CLIENT_CONNECTED, newClientConnected);
        socket.off(EVENTS.ROOM_STATUS, roomStatus);

        socket.close();
      };
    },
    [],
  );

  const closeModal = () => setModalMessage('');

  const completeSignOut = async (): Promise<boolean> => {
    if (connection?.current?.connected) {
      connection.current.emit(EVENTS.COMPLETE_LOGOUT);
    }

    deleteCookie();
    deleteToken();

    try {
      await axios({
        headers: {
          Authorization: token,
        },
        method: 'GET',
        url: `${BACKEND_URL}/api/auth/signout/complete`,
      });
      return router.push('/');
    } catch {
      return router.push('/');
    }
  };

  const reconnect = useCallback(
    (): void => {
      if (connection.current.connected) {
        connection.current.disconnect();
      }

      return connection.current.open();
    },
    [connection],
  );

  const signOut = (): Promise<boolean> => {
    deleteCookie();
    deleteToken();
    return router.push('/signin');
  };

  return (
    <>
      <Header authenticated={!!token} />
      { modalMessage && (
        <ModalFrame
          closeModal={closeModal}
          message={modalMessage}
        />
      ) }
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
        <div>
          { `Desktop application is ${desktopConnected ? 'connected' : 'not connected'}` }
        </div>
        <div>
          { `Mobile application is ${mobileConnected ? 'connected' : 'not connected'}` }
        </div>
        <div>
          { webConnected && 'Web application is connected' }
          { !webConnected && (
            <button
              onClick={reconnect}
              type="button"
            >
              Reconnect
            </button>
          ) }
        </div>
      </div>
    </>
  );
}
