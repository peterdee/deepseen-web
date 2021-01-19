import React, { memo } from 'react';

import styles from './styles.module.css';

interface StyledButtonProps {
  isSubmit?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any,
  text: string;
}

function StyledButton(props: StyledButtonProps): React.ReactElement {
  const {
    isSubmit = false,
    onClick,
    text,
  } = props;

  return (
    <button
      className={styles.button}
      onClick={onClick}
      type={isSubmit ? 'submit' : 'button'}
    >
      { text }
    </button>
  );
}

StyledButton.defaultProps = {
  isSubmit: false,
  onClick: () => null,
};

export default memo(StyledButton);
