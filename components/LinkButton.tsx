import React, { memo } from 'react';

import styles from './styles.module.css';

interface LinkButtonProps {
  classes?: string[];
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any,
  text: string;
}

function LinkButton(props: LinkButtonProps): React.ReactElement {
  const {
    classes,
    disabled,
    onClick,
    text,
  } = props;

  return (
    <button
      className={`${styles.linkButton} ${classes.join(' ')} noselect`}
      disabled={disabled}
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
  onClick: () => null,
};

export default memo(LinkButton);
