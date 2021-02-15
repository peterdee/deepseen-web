import React, { memo } from 'react';

import { StyledProps } from '@/@types/components';
import styles from './styles.module.css';

function StyledTextArea(props: StyledProps): React.ReactElement {
  const {
    disabled,
    error,
    name,
    onChange,
    placeholder,
    value,
  } = props;

  const handleInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => onChange(event.target.value, event.target.name);

  return (
    <textarea
      className={`${styles.textarea} ${error ? styles.inputError : ''}`}
      disabled={disabled}
      name={name}
      onChange={handleInput}
      placeholder={placeholder}
      value={value}
    />
  );
}

StyledTextArea.defaultProps = {
  disabled: false,
  error: false,
  placeholder: '',
};

export default memo(StyledTextArea);
