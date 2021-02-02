import React from 'react';

import styles from '../Validate.module.css';

import { DataCollection } from './types';
import StyledButton from '../../../components/StyledButton';
import StyledInput from '../../../components/StyledInput';

interface NewPasswordFormProps {
  data: DataCollection<string>;
  errors: DataCollection<boolean>;
  formError: string;
  handleInput: (value: string, name: string) => void;
  handleSubmit: (event: React.FormEvent) => Promise<any>
  loading: boolean;
}

export default function NewPasswordForm(props: NewPasswordFormProps) {
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
