import React from 'react';

export interface FormProps {
  formError: string;
  handleInput: (value: string, name?: string) => void;
  handleSubmit: (event: React.FormEvent) => Promise<any>;
  loading: boolean;
}

export interface EmailFormProps extends FormProps {
  email: string;
}

export interface NewPasswordFormProps extends FormProps {
  password: string;
  passwordConfirmation: string;
  passwordConfirmationError: boolean;
  passwordError: boolean;
}

export interface SignInFormProps extends FormProps {
  email: string;
  emailError: boolean;
  password: string;
  passwordError: boolean;
}

export interface SignUpFormProps extends FormProps {
  email: string;
  emailError: boolean;
  firstName: string;
  firstNameError: boolean;
  lastName: string;
  lastNameError: boolean;
  password: string;
  passwordConfirmation: string;
  passwordConfirmationError: boolean;
  passwordError: boolean;
}
