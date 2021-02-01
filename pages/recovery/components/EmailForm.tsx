import React from 'react';

import styles from '../Recovery.module.css';

import StyledButton from '../../../components/StyledButton';
import StyledInput from '../../../components/StyledInput';

interface SignUpFormProps {
  email: string;
  formError: string;
  handleInput: (name: string, value: string) => void;
  handleSubmit: (event: React.FormEvent) => Promise<any>
  loading: boolean;
}

export default function EmailForm(props: SignUpFormProps) {
  const {
    email,
    formError,
    handleInput,
    handleSubmit,
    loading,
  } = props;

  return (
    <form
      className="col"
      onSubmit={handleSubmit}
    >
      <StyledInput
        disabled={loading}
        error={!!formError}
        name="email"
        onChange={handleInput}
        placeholder="Email"
        type="email"
        value={email}
      />
      <div className={`${styles.errorContainer} noselect`}>
        { formError }
      </div>
      <StyledButton
        disabled={loading}
        isSubmit
        text="SUBMIT"
      />
    </form>
  );
}
