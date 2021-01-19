import React from 'react';

import { Errors } from '../types';
import styles from '../SignUp.module.css';

import StyledButton from '../../../components/StyledButton';
import StyledInput from '../../../components/StyledInput';

interface SignUpFormProps {
  email: string;
  errors: Errors;
  firstName: string;
  formError: string;
  handleInput: (name: string, value: string) => void;
  handleSubmit: (event: React.FormEvent) => Promise<void>
  lastName: string;
  loading: boolean;
  password: string;
  passwordConfirmation: string;
}

export default function SignUpForm(props: SignUpFormProps) {
  const {
    email,
    errors,
    firstName,
    formError,
    handleInput,
    handleSubmit,
    lastName,
    loading,
    password,
    passwordConfirmation,
  } = props;

  return (
    <form
      className="col"
      onSubmit={handleSubmit}
    >
      <StyledInput
        disabled={loading}
        error={errors.firstName}
        name="firstName"
        onChange={handleInput}
        placeholder="First name"
        type="text"
        value={firstName}
      />
      <StyledInput
        disabled={loading}
        error={errors.lastName}
        name="lastName"
        onChange={handleInput}
        placeholder="Last name"
        type="text"
        value={lastName}
      />
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
      <StyledInput
        disabled={loading}
        error={errors.passwordConfirmation}
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
