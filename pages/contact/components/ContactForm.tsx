import React from 'react';

import { ContactFormProps } from '@/@types/forms';
import StyledButton from '@/components/StyledButton';
import StyledInput from '@/components/StyledInput';
import StyledTextarea from '@/components/StyledTextarea';
import styles from '@/styles/Auth.module.css';

export default function ContactForm(props: ContactFormProps): React.ReactElement {
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
      className="flex direction-column"
      onSubmit={handleSubmit}
    >
      <StyledInput
        classes={['w100']}
        disabled={loading}
        error={nameError}
        name="name"
        onChange={handleInput}
        placeholder="Name"
        type="text"
        value={name}
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
      <StyledTextarea
        classes={['w100']}
        disabled={loading}
        error={messageError}
        name="message"
        onChange={handleInput}
        placeholder="Message"
        value={message}
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
