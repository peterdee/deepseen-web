import React from 'react';

import StyledButton from '@/components/StyledButton';
import StyledInput from '@/components/StyledInput';
import styles from '@/styles/Home.module.css';
import { UpdateAccountFormProps } from '@/@types/forms';

export default function UpdateAccountForm(props: UpdateAccountFormProps): React.ReactElement {
  const {
    firstName,
    firstNameError,
    formError,
    handleInput,
    handleSubmit,
    lastName,
    lastNameError,
    loading,
  } = props;

  return (
    <form
      className="flex direction-column col-xs-12 col-sm-12 col-md-8 col-lg-6"
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
      <div className={`${styles.homeErrorContainer} noselect`}>
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
