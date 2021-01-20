import React, { memo } from 'react';

import styles from './styles.module.css';

function Footer(): React.ReactElement {
  return (
    <div className={`${styles.footer} noselect`}>
      { `Deepseen © ${new Date().getFullYear()} by Peter Dyumin` }
    </div>
  );
}

export default memo(Footer);
