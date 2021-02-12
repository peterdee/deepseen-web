import React, { memo } from 'react';

import LinkButton from './LinkButton';
import styles from './styles.module.css';

interface HeaderMenuProps {
  handleHome: () => Promise<boolean>;
  handleSignOut: () => Promise<boolean>;
}

function HeaderMenu({ handleHome, handleSignOut }: HeaderMenuProps): React.ReactElement {
  return (
    <div className={styles.headerMenuWrap}>
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
