import React from 'react';

import StyledButton from '../../../components/StyledButton';
import StyledInput from '../../../components/StyledInput';

interface SignUpFormProps {
  email: string;
  firstName: string;
  lastName: string;
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
    lastName,
    password,
    passwordConfirmation,
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    setPasswordConfirmation,
  } = props;

  return (
    <form className="col">
      <StyledInput
        name="first-name"
        onChange={setFirstName}
        placeholder="First name"
        type="text"
        value={firstName}
      />
      <StyledInput
        name="last-name"
        onChange={setLastName}
        placeholder="Last name"
        type="text"
        value={lastName}
      />
      <StyledInput
        name="email"
        onChange={setEmail}
        placeholder="Email"
        type="email"
        value={email}
      />
      <StyledInput
        name="password"
        onChange={setPassword}
        placeholder="Password"
        type="password"
        value={password}
      />
      <StyledInput
        name="password-confirm"
        onChange={setPasswordConfirmation}
        placeholder="Password confirmation"
        type="password"
        value={passwordConfirmation}
      />
      <StyledButton
        isSubmit
        text="SUBMIT"
      />
    </form>
  );
}
