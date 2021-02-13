import React, { memo, useRef } from 'react';

import useOutsideClick from '@/hooks/use-outside-click';

import LinkButton from './LinkButton';
import styles from './styles.module.css';

interface HeaderMenuProps {
  controlRef: React.RefObject<HTMLDivElement>;
  handleHome: () => Promise<boolean>;
  handleOutsideClick: () => void;
  handleSignOut: () => Promise<boolean>;
}

function HeaderMenu({
  controlRef,
  handleHome,
  handleOutsideClick,
  handleSignOut,
}: HeaderMenuProps): React.ReactElement {
  const targetRef = useRef<HTMLDivElement>(null);

  useOutsideClick(targetRef, controlRef, handleOutsideClick);

  return (
    <div
      className={styles.headerMenuWrap}
      ref={targetRef}
    >
      <LinkButton
        classes={[styles.headerMenuItem]}
        onClick={handleHome}
        text="HOME"
      />
      <LinkButton
        classes={[styles.headerMenuItem]}
        onClick={handleSignOut}
        text="SIGN OUT"
      />
    </div>
  );
}

export default memo(HeaderMenu);
