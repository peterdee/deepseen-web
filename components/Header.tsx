import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import { getData } from '@/utilities/data-actions';
import { User } from '@/@types/user';

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

  const handleLogoClick = useCallback(
    () => router.push('/'),
    [router],
  );

  return (
    <div className={styles.headerWrap}>
      <div className={styles.headerLeft}>
        <button
          className={styles.headerLogo}
          onClick={handleLogoClick}
          type="button"
        >
          { ' ' }
        </button>
      </div>
      <div>
        { userName }
      </div>
    </div>
  );
}

Header.defaultProps = {
  authenticated: false,
};

export default memo(Header);
