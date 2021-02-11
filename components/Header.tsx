import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import { getData } from '@/utilities/data-actions';
import { User } from '@/@types/user';

import LinkButton from './LinkButton';
import styles from './styles.module.css';

interface HeaderProps {
  authenticated?: boolean;
}

function Header({ authenticated }: HeaderProps) {
  const [userName, setUserName] = useState<string>('');

  const router = useRouter();

  useEffect(
    () => {
      if (authenticated) {
        const user = getData<User>('user');
        setUserName(`${user.firstName || ''} ${user.lastName || ''}`);
      }
    },
    [],
  );

  const handleLogo = useCallback(() => router.push('/'), [router]);

  const handleSignIn = useCallback(() => router.push('/signin'), [router]);

  const handleSignUp = useCallback(() => router.push('/signup'), [router]);

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
        { authenticated && userName }
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
