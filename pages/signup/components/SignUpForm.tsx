import React from 'react';

import StyledButton from '../../../components/StyledButton';
import StyledInput from '../../../components/StyledInput';

interface SignUpFormProps {
  email: string;
  firstName: string;
  handleSubmit: (event: React.FormEvent) => Promise<void>
  lastName: string;
  loading: boolean;
  password: string;
  passwordConfirmation: string;
  setEmail: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setPassword: (value: string) => void;
  setPasswordConfirmation: (value: string) => void;
}

export default function SignUpForm(props: SignUpFormProps) {
  const {
    email,
    firstName,
    handleSubmit,
    lastName,
    loading,
    password,
    passwordConfirmation,
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    setPasswordConfirmation,
  } = props;

  return (
    <form
      className="col"
      onSubmit={handleSubmit}
    >
      <StyledInput
        disabled={loading}
        name="first-name"
        onChange={setFirstName}
        placeholder="First name"
        type="text"
        value={firstName}
      />
      <StyledInput
        disabled={loading}
        name="last-name"
        onChange={setLastName}
        placeholder="Last name"
        type="text"
        value={lastName}
      />
      <StyledInput
        disabled={loading}
        name="email"
        onChange={setEmail}
        placeholder="Email"
        type="email"
        value={email}
      />
      <StyledInput
        disabled={loading}
        name="password"
        onChange={setPassword}
        placeholder="Password"
        type="password"
        value={password}
      />
      <StyledInput
        disabled={loading}
        name="password-confirm"
        onChange={setPasswordConfirmation}
        placeholder="Password confirmation"
        type="password"
        value={passwordConfirmation}
      />
      <StyledButton
        classes={['mt-16']}
        disabled={loading}
        isSubmit
        text="SUBMIT"
      />
    </form>
  );
}
