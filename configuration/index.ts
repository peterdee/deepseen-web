export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:1337';

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
  connectError: 'Error connecting to the server. Please sign out and sign in again!',
  emailAlreadyInUse: 'Email address is already in use!',
  invalidPasswordConfirmation: 'Password confirmation is invalid!',
  invalidRecoveryLink: 'Recovery link is invalid!',
  missingData: 'Missing required data!',
  oldPasswordIsInvalid: 'Old password is invalid!',
  oops: 'Oops! Something went wrong!',
  pleaseProvideData: 'Please provide the necessary data!',
  providedInvalidData: 'Provided data is invalid!',
  tooManyRequests: 'You are suspended from this functionality!',
} as const;

export const EVENTS = {
  CLIENT_DISCONNECTED: 'CLIENT_DISCONNECTED',
  connect: 'connect',
  connect_error: 'connect_error',
  disconnect: 'disconnect',
  COMPLETE_LOGOUT: 'COMPLETE_LOGOUT',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NEW_CLIENT_CONNECTED: 'NEW_CLIENT_CONNECTED',
  ROOM_STATUS: 'ROOM_STATUS',
} as const;

export const RESPONSE_MESSAGES = {
  accessDenied: 'ACCESS_DENIED',
  emailAlreadyInUse: 'EMAIL_ALREADY_IN_USE',
  imageRecordNotFound: 'IMAGE_RECORD_NOT_FOUND',
  internalServerError: 'INTERNAL_SERVER_ERROR',
  invalidData: 'INVALID_DATA',
  missingData: 'MISSING_DATA',
  oldPasswordIsInvalid: 'OLD_PASSWORD_IS_INVALID',
  passwordRecordNotFound: 'PASSWORD_RECORD_NOT_FOUND',
  tooManyRequests: 'TOO_MANY_REQUESTS',
} as const;

export const TOKEN_NAME = 'token';

export const WEBSOCKETS_URL = process.env.NEXT_PUBLIC_WEBSOCKETS_URL || 'http://localhost:9500';
