import React from 'react';

import { DataCollection } from './types';
import styles from '../SignUp.module.css';

import StyledButton from '../../../components/StyledButton';
import StyledInput from '../../../components/StyledInput';

interface SignUpFormProps {
  data: DataCollection<string>;
  errors: DataCollection<boolean>;
  formError: string;
  handleInput: (value: string, name: string) => void;
  handleSubmit: (event: React.FormEvent) => Promise<any>;
  loading: boolean;
}

export default function SignUpForm(props: SignUpFormProps) {
  const {
    data,
    errors,
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
        error={errors.firstName}
        name="firstName"
        onChange={handleInput}
        placeholder="First name"
        type="text"
        value={data.firstName}
      />
      <StyledInput
        disabled={loading}
        error={errors.lastName}
        name="lastName"
        onChange={handleInput}
        placeholder="Last name"
        type="text"
        value={data.lastName}
      />
      <StyledInput
        disabled={loading}
        error={errors.email}
        name="email"
        onChange={handleInput}
        placeholder="Email"
        type="email"
        value={data.email}
      />
      <StyledInput
        disabled={loading}
        error={errors.password}
        name="password"
        onChange={handleInput}
        placeholder="Password"
        type="password"
        value={data.password}
      />
      <StyledInput
        disabled={loading}
        error={errors.passwordConfirmation}
        name="passwordConfirmation"
        onChange={handleInput}
        placeholder="Password confirmation"
        type="password"
        value={data.passwordConfirmation}
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
