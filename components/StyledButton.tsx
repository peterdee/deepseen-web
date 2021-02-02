import React, { memo } from 'react';

import { StyledButtonProps } from '@/@types/components';
import styles from './styles.module.css';

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
      className={`${styles.button} ${classes.join(' ')} noselect`}
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
