import React, { useState } from 'react';

import SignUpForm from './components/SignUpForm';
import styles from './SignUp.module.css';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  return (
    <div className={`col ${styles.content}`}>
      <div className={`${styles.header} noselect`}>
        SIGN UP
      </div>
      <SignUpForm
        email={email}
        firstName={firstName}
        lastName={lastName}
        password={password}
        passwordConfirmation={passwordConfirmation}
        setEmail={setEmail}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setPassword={setPassword}
        setPasswordConfirmation={setPasswordConfirmation}
      />
    </div>
  );
}
