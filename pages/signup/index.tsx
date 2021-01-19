import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import { BACKEND_URL, CLIENT_TYPE } from '../../configuration';
import { Errors } from './types';
import styles from './SignUp.module.css';

import LinkButton from '../../components/LinkButton';
import SignUpForm from './components/SignUpForm';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({
    email: false,
    firstName: false,
    lastName: false,
    password: false,
    passwordConfirmation: false,
  });
  const [firstName, setFirstName] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const router = useRouter();

  const handleBackButton = () => router.push('/');
  const handleHaveAccountButton = () => router.push('/signin');

  const handleInput = (value: string, name: string): void => {
    setErrors((state) => ({
      ...state,
      [name]: false,
    }));
    setFormError('');
    switch (name) {
      case 'email': {
        return setEmail(value);
      }
      case 'firstName': {
        return setFirstName(value);
      }
      case 'lastName': {
        return setLastName(value);
      }
      case 'password': {
        return setPassword(value);
      }
      default: {
        return setPasswordConfirmation(value);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = {
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      password: password.trim(),
      passwordConfirmation: passwordConfirmation.trim(),
    };
    if (!(trimmed.email && trimmed.firstName && trimmed.lastName
      && trimmed.password && trimmed.passwordConfirmation)) {
      const inputErrors = Object.keys(errors).reduce(
        (obj, key) => ({ ...obj, [key]: !trimmed[key] }),
        {} as Errors,
      );
      setErrors(inputErrors);
      return setFormError('Please provide the necessary data!');
    }

    if (trimmed.password !== trimmed.passwordConfirmation) {
      setErrors((state) => ({
        ...state,
        password: true,
        passwordConfirmation: true,
      }));
      return setFormError('Password confirmation is invalid!');
    }

    setLoading(true);
    const noErrors = Object.keys(errors).reduce(
      (obj, key) => ({ ...obj, [key]: false }),
      {} as Errors,
    );
    setErrors(noErrors);

    try {
      const response = await axios({
        data: {
          client: CLIENT_TYPE,
          email: trimmed.email,
          firstName: trimmed.firstName,
          lastName: trimmed.lastName,
          password: trimmed.password,
        },
        method: 'POST',
        url: `${BACKEND_URL}/api/auth/signup`,
      });
      console.log(response);
      return setLoading(false);
    } catch (error) {
      console.log(error);
      return setLoading(false);
    }
  };

  return (
    <div className={`col ${styles.content}`}>
      <div className={`${styles.header} noselect`}>
        SIGN UP
      </div>
      <SignUpForm
        email={email}
        errors={errors}
        firstName={firstName}
        formError={formError}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        lastName={lastName}
        loading={loading}
        password={password}
        passwordConfirmation={passwordConfirmation}
      />
      <LinkButton
        classes={['mt-16']}
        disabled={loading}
        onClick={handleHaveAccountButton}
        text="Already have an account?"
      />
      <LinkButton
        classes={['mt-16']}
        disabled={loading}
        onClick={handleBackButton}
        text="Back"
      />
    </div>
  );
}
