import React from 'react';

import { Errors } from '../types';
import styles from '../SignUp.module.css';

import StyledButton from '../../../components/StyledButton';
import StyledInput from '../../../components/StyledInput';

interface SignUpFormProps {
  email: string;
  errors: Errors;
  formError: string;
  handleInput: (name: string, value: string) => void;
  handleSubmit: (event: React.FormEvent) => Promise<any>
  loading: boolean;
  password: string;
}

export default function SignUpForm(props: SignUpFormProps) {
  const {
    email,
    errors,
    formError,
    handleInput,
    handleSubmit,
    loading,
    password,
  } = props;

  return (
    <form
      className="col"
      onSubmit={handleSubmit}
    >
      <StyledInput
        disabled={loading}
        error={errors.email}
        name="email"
        onChange={handleInput}
        placeholder="Email"
        type="email"
        value={email}
      />
      <StyledInput
        disabled={loading}
        error={errors.password}
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
        disabled={loading}
        isSubmit
        text="SUBMIT"
      />
    </form>
  );
}
