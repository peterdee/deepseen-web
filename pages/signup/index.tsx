import React, { useState } from 'react';

import SignUpForm from './components/SignUpForm';
import styles from './SignUp.module.css';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
  };

  return (
    <div className={`col ${styles.content}`}>
      <div className={`${styles.header} noselect`}>
        SIGN UP
      </div>
      <SignUpForm
        email={email}
        firstName={firstName}
        handleSubmit={handleSubmit}
        lastName={lastName}
        loading={loading}
        password={password}
        passwordConfirmation={passwordConfirmation}
        setEmail={setEmail}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setPassword={setPassword}
        setPasswordConfirmation={setPasswordConfirmation}
      />
      <a
        className={styles.link}
        href="/signin"
      >
        Already have an account?
      </a>
      <a
        className={styles.link}
        href="/"
      >
        Back
      </a>
    </div>
  );
}
