import React, { memo } from 'react';

import styles from './styles.module.css';

interface StyledButtonProps {
  classes?: string[];
  disabled?: boolean;
  isSubmit?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any,
  text: string;
}

function StyledButton(props: StyledButtonProps): React.ReactElement {
  const {
    classes,
    disabled,
    isSubmit,
    onClick,
    text,
  } = props;

  return (
    <button
      className={`${styles.button} ${classes.join(' ')}`}
      disabled={disabled}
      onClick={onClick}
      type={isSubmit ? 'submit' : 'button'}
    >
      { text }
    </button>
  );
}

StyledButton.defaultProps = {
  classes: [],
  disabled: false,
  isSubmit: false,
  onClick: () => null,
};

export default memo(StyledButton);
