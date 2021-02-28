import React, { memo } from 'react';

import styles from './styles.module.css';

function Footer(): React.ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} noselect`}>
      <span>{ `Deepseen © ${year}` }</span>
      <span className="mx-3">|</span>
      <span>
        <a href="https://github.com/peterdee">
          Peter Dyumin
        </a>
      </span>
      <span className="mx-3">|</span>
      <span>
        <a href="/contact">
          Contact
        </a>
      </span>
      <span className="mx-3">|</span>
      <span>
        <a href="/about">
          About Deepseen
        </a>
      </span>
      <span className="mx-3">|</span>
      <span>
        <a href="/user-agreement">
          User Agreement
        </a>
      </span>
    </footer>
  );
}

export default memo(Footer);
