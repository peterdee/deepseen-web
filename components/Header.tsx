import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import deleteCookie from '@/utilities/delete-cookie';
import deleteToken from '@/utilities/delete-token';
import { getData } from '@/utilities/data-actions';
import { User } from '@/@types/user';

import HeaderMenu from './HeaderMenu';
import LinkButton from './LinkButton';
import styles from './styles.module.css';

interface HeaderProps {
  authenticated?: boolean;
}

function Header({ authenticated }: HeaderProps): React.ReactElement {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  const router = useRouter();
  const controlRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      if (authenticated) {
        const user = getData<User>('user');
        setUserName(`${user.firstName || ''} ${user.lastName || ''}`);
      }
    },
    [],
  );

  const handleHome = useCallback(() => router.push('/home'), [router]);
  const handleLogo = useCallback(() => router.push('/'), [router]);
  const handleSignIn = useCallback(() => router.push('/signin'), [router]);
  const handleSignUp = useCallback(() => router.push('/signup'), [router]);

  const handleMenu = useCallback(() => setShowMenu((state) => !state), [setShowMenu]);

  const handleSignOut = useCallback(
    () => {
      deleteCookie();
      deleteToken();
      return router.push('/');
    },
    [router],
  );

  return (
    <div className={styles.headerWrap}>
      <div className={styles.headerLeft}>
        <button
          className={styles.headerLogo}
          onClick={handleLogo}
          type="button"
        >
          { ' ' }
        </button>
      </div>
      <div>
        { showMenu && (
          <HeaderMenu
            controlRef={controlRef}
            handleHome={handleHome}
            handleOutsideClick={handleMenu}
            handleSignOut={handleSignOut}
          />
        ) }
        { authenticated && (
          <div ref={controlRef}>
            <LinkButton
              classes={[styles.signUp]}
              id="menu"
              onClick={handleMenu}
              text={userName}
            />
          </div>
        ) }
        { !authenticated && (
          <>
            <LinkButton
              classes={['mr-16']}
              onClick={handleSignIn}
              text="SIGN IN"
            />
            <LinkButton
              classes={[styles.signUp]}
              onClick={handleSignUp}
              text="SIGN UP"
            />
          </>
        ) }
      </div>
    </div>
  );
}

Header.defaultProps = {
  authenticated: false,
};

export default memo(Header);
