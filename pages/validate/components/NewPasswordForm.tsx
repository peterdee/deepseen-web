import React from 'react';

import { NewPasswordFormProps } from '@/@types/forms';
import StyledButton from '@/components/StyledButton';
import StyledInput from '@/components/StyledInput';

import styles from '../Validate.module.css';

export default function NewPasswordForm(props: NewPasswordFormProps) {
  const {
    formError,
    handleInput,
    handleSubmit,
    loading,
    password,
    passwordConfirmation,
    passwordConfirmationError,
    passwordError,
  } = props;

  return (
    <form
      className="col"
      onSubmit={handleSubmit}
    >
      <StyledInput
        disabled={loading}
        error={passwordError}
        name="password"
        onChange={handleInput}
        placeholder="Password"
        type="password"
        value={password}
      />
      <StyledInput
        disabled={loading}
        error={passwordConfirmationError}
        name="passwordConfirmation"
        onChange={handleInput}
        placeholder="Password confirmation"
        type="password"
        value={passwordConfirmation}
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
