import React from 'react';

import { SignUpFormProps } from '@/@types/forms';
import StyledButton from '@/components/StyledButton';
import StyledInput from '@/components/StyledInput';

import styles from '../SignUp.module.css';

export default function SignUpForm(props: SignUpFormProps): React.ReactElement {
  const {
    email,
    emailError,
    firstName,
    firstNameError,
    formError,
    handleInput,
    handleSubmit,
    lastName,
    lastNameError,
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
        error={firstNameError}
        name="firstName"
        onChange={handleInput}
        placeholder="First name"
        type="text"
        value={firstName}
      />
      <StyledInput
        disabled={loading}
        error={lastNameError}
        name="lastName"
        onChange={handleInput}
        placeholder="Last name"
        type="text"
        value={lastName}
      />
      <StyledInput
        disabled={loading}
        error={emailError}
        name="email"
        onChange={handleInput}
        placeholder="Email"
        type="email"
        value={email}
      />
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
