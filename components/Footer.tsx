import React, { memo } from 'react';

import styles from './styles.module.css';

function Footer(): React.ReactElement {
  const link = <a href="https://github.com/peterdee">Peter Dyumin</a>;
  return (
    <footer className={`${styles.footer} noselect`}>
      <span>{ `Deepseen © ${new Date().getFullYear()}` }</span>
      <span className="ml-16 mr-16"> | </span>
      <span>{ link }</span>
    </footer>
  );
}

export default memo(Footer);
