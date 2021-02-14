import React, { memo } from 'react';

import styles from './styles.module.css';

function Footer(): React.ReactElement {
  return (
    <footer className={`${styles.footer} noselect`}>
      <span>{ `Deepseen © ${new Date().getFullYear()}` }</span>
      <span className="ml-16 mr-16">|</span>
      <span>
        <a href="https://github.com/peterdee">
          Peter Dyumin
        </a>
      </span>
      <span className="ml-16 mr-16">|</span>
      <span>
        <a href="/contact">
          Contact
        </a>
      </span>
    </footer>
  );
}

export default memo(Footer);
