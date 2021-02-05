import React, { memo } from 'react';

import styles from './styles.module.css';

interface ModalWrapProps {
  children?: React.ReactNode;
}

function ModalWrap({ children }: ModalWrapProps): React.ReactElement {
  return (
    <>
      <div className={styles.modalBackground} />
      <div className={styles.modalForeground}>
        { children }
      </div>
    </>
  );
}

ModalWrap.defaultProps = {
  children: [],
};

export default memo(ModalWrap);
