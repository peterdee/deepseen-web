import React, { memo } from 'react';

import styles from './styles.module.css';

interface StyledInputProps {
  name: string;
  onChange: (string: string) => void,
  placeholder?: string;
  type: string;
  value: string;
}

function StyledInput(props: StyledInputProps): React.ReactElement {
  const {
    name,
    onChange,
    placeholder = '',
    type,
    value,
  } = props;

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => onChange(event.target.value);

  return (
    <input
      className={styles.input}
      name={name}
      onChange={handleInput}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
}

StyledInput.defaultProps = {
  placeholder: '',
};

export default memo(StyledInput);
