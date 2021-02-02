import React from 'react';

import { SignInDataCollection } from './signin';

export interface FormProps {
  formError: string;
  handleInput: (value: string, name?: string) => void;
  handleSubmit: (event: React.FormEvent) => Promise<any>;
  loading: boolean;
}

export interface EmailFormProps extends FormProps {
  email: string;
}

export interface SignInFormProps extends FormProps {
  data: SignInDataCollection<string>;
  errors: SignInDataCollection<boolean>;
}
