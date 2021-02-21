import React from 'react';

import { EmailFormProps } from '@/@types/forms';
import StyledButton from '@/components/StyledButton';
import StyledInput from '@/components/StyledInput';
import styles from '@/styles/Auth.module.css';

export default function EmailForm(props: EmailFormProps): React.ReactElement {
  const {
    email,
    formError,
    handleInput,
    handleSubmit,
    loading,
  } = props;

  return (
    <form
      className="flex direction-column"
      onSubmit={handleSubmit}
    >
      <StyledInput
        classes={['w100']}
        disabled={loading}
        error={!!formError}
        name="email"
        onChange={handleInput}
        placeholder="Email"
        type="email"
        value={email}
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
