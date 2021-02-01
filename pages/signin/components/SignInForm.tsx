import React from 'react';

import { DataCollection } from '../types';
import styles from '../SignIn.module.css';

import StyledButton from '../../../components/StyledButton';
import StyledInput from '../../../components/StyledInput';

interface SignInFormProps {
  data: DataCollection<string>;
  errors: DataCollection<boolean>;
  formError: string;
  handleInput: (value: string, name: string) => void;
  handleSubmit: (event: React.FormEvent) => Promise<any>;
  loading: boolean;
}

export default function SignInForm(props: SignInFormProps) {
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
