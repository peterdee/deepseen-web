import React, { memo } from 'react';

import { NewPasswordFormProps } from '@/@types/forms';
import StyledButton from '@/components/StyledButton';
import StyledInput from '@/components/StyledInput';
import styles from '@/styles/Auth.module.css';

function NewPasswordForm(props: NewPasswordFormProps): React.ReactElement {
  const {
    formError,
    handleInput,
    handleSubmit,
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

export default memo(NewPasswordForm);
