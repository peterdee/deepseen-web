import React, { memo } from 'react';

import { StyledInputProps } from '@/@types/components';
import styles from './styles.module.css';

function StyledInput(props: StyledInputProps): React.ReactElement {
  const {
    classes,
    disabled,
    error,
    name,
    onChange,
    placeholder,
    type,
    value,
  } = props;

  return (
    <input
      className={`${styles.input} ${classes.join(' ')} ${error ? styles.inputError : ''}`}
      disabled={disabled}
      name={name}
      onChange={(
        event: React.ChangeEvent<HTMLInputElement>,
      ) => onChange(event.target.value, event.target.name)}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
}

StyledInput.defaultProps = {
  classes: [],
  disabled: false,
  error: false,
  placeholder: '',
};

export default memo(StyledInput);
