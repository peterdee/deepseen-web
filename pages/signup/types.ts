export interface Data {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
}

export interface Errors {
  email: boolean;
  firstName: boolean;
  lastName: boolean;
  password: boolean;
  passwordConfirmation: boolean;
}
