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
      className="flex direction-column"
      onSubmit={handleSubmit}
    >
      <StyledInput
        classes={['w100']}
        disabled={loading}
        error={firstNameError}
        name="firstName"
        onChange={handleInput}
        placeholder="First name"
        type="text"
        value={firstName}
      />
      <StyledInput
        classes={['w100']}
        disabled={loading}
        error={lastNameError}
        name="lastName"
        onChange={handleInput}
        placeholder="Last name"
        type="text"
        value={lastName}
      />
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
      <StyledInput
        classes={['w100']}
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
        classes={['w100']}
        disabled={loading}
        isSubmit
        text="SUBMIT"
      />
    </form>
  );
}
