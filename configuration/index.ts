export const {
  NEXT_PUBLIC_BACKEND_URL: BACKEND_URL = 'http://localhost:1337',
} = process.env;

export const CLIENT_TYPES = {
  desktop: 'desktop',
  mobile: 'mobile',
  web: 'web',
} as const;

export const CLIENT_TYPE = CLIENT_TYPES.web;

export const COOKIE_NAME = 'token';

export const ERROR_MESSAGES = {
  accessDenied: 'Access denied!',
  accountNotFound: 'Account not found!',
  emailAlreadyInUse: 'Email address is already in use!',
  invalidPasswordConfirmation: 'Password confirmation is invalid!',
  invalidRecoveryLink: 'Recovery link is invalid!',
  missingData: 'Missing required data!',
  oops: 'Oops! Something went wrong!',
  pleaseProvideData: 'Please provide the necessary data!',
  providedInvalidData: 'Provided data is invalid!',
  tooManyRequests: 'You are suspended from this functionality!',
} as const;

export const RESPONSE_MESSAGES = {
  accessDenied: 'ACCESS_DENIED',
  emailAlreadyInUse: 'EMAIL_ALREADY_IN_USE',
  internalServerError: 'INTERNAL_SERVER_ERROR',
  invalidData: 'INVALID_DATA',
  missingData: 'MISSING_DATA',
  tooManyRequests: 'TOO_MANY_REQUESTS',
} as const;

export const TOKEN_NAME = 'token';
