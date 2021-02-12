import React, { memo } from 'react';

import { ButtonProps } from '@/@types/components';
import styles from './styles.module.css';

function LinkButton(props: ButtonProps): React.ReactElement {
  const {
    classes,
    disabled,
    id,
    onClick,
    text,
  } = props;

  return (
    <button
      className={`${styles.linkButton} ${classes.join(' ')} noselect`}
      disabled={disabled}
      id={id}
      onClick={onClick}
      type="button"
    >
      { text }
    </button>
  );
}

LinkButton.defaultProps = {
  classes: [],
  disabled: false,
  id: '',
  onClick: () => null,
};

export default memo(LinkButton);
