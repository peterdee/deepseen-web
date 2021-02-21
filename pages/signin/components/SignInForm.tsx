import React from 'react';

import { SignInFormProps } from '@/@types/forms';
import StyledButton from '@/components/StyledButton';
import StyledInput from '@/components/StyledInput';
import styles from '@/styles/Auth.module.css';

export default function SignInForm(props: SignInFormProps): React.ReactElement {
  const {
    email,
    emailError,
    formError,
    handleInput,
    handleSubmit,
    loading,
    password,
    passwordError,
  } = props;

  return (
    <form
      className="flex direction-column"
      onSubmit={handleSubmit}
    >
      <StyledInput
        classes={['w100']}
        disabled={loading}
        error={emailError}
        name="email"
        onChange={handleInput}
        placeholder="Email"
        type="email"
        value={email}
      />
      <StyledInput
        classes={['w100']}
        disabled={loading}
        error={passwordError}
        name="password"
        onChange={handleInput}
        placeholder="Password"
        type="password"
        value={password}
      />
      <div className={`${styles.errorContainer} noselect`}>
        { formError }
      </div>
      <StyledButton
        classes={['w100']}
        disabled={loading}
        isSubmit
        text="SUBMIT"
      />
    </form>
  );
}
