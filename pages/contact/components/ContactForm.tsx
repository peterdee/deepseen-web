import React from 'react';

import { ContactFormProps } from '@/@types/forms';
import StyledButton from '@/components/StyledButton';
import StyledInput from '@/components/StyledInput';

import styles from '../Contact.module.css';

export default function EmailForm(props: ContactFormProps): React.ReactElement {
  const {
    email,
    emailError,
    formError,
    handleInput,
    handleSubmit,
    loading,
    message,
    messageError,
    name,
    nameError,
  } = props;

  return (
    <form
      className="col"
      onSubmit={handleSubmit}
    >
      <StyledInput
        disabled={loading}
        error={nameError}
        name="name"
        onChange={handleInput}
        placeholder="Name"
        type="text"
        value={name}
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
        error={messageError}
        name="message"
        onChange={handleInput}
        placeholder="Message"
        type="text"
        value={message}
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
