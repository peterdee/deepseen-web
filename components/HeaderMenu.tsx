import React, { memo, useRef } from 'react';

import useOutsideClick from '@/hooks/use-outside-click';

import LinkButton from './LinkButton';
import styles from './styles.module.css';

interface HeaderMenuProps {
  handleHome: () => Promise<boolean>;
  handleOutsideClick: () => void;
  handleSignOut: () => Promise<boolean>;
}

function HeaderMenu({
  handleHome,
  handleOutsideClick,
  handleSignOut,
}: HeaderMenuProps): React.ReactElement {
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(menuRef, handleOutsideClick);

  return (
    <div
      className={styles.headerMenuWrap}
      ref={menuRef}
    >
      <LinkButton
        onClick={handleHome}
        text="HOME"
      />
      <LinkButton
        onClick={handleSignOut}
        text="SIGN OUT"
      />
    </div>
  );
}

export default memo(HeaderMenu);
