import React, { memo } from 'react';

import styles from './styles.module.css';

function Loader(): React.ReactElement {
  return (
    <>
      <div className={styles.background} />
      <div className={styles.loader}>
        <div className={styles.ldsripple}>
          <div />
          <div />
        </div>
      </div>
    </>
  );
}

export default memo(Loader);
