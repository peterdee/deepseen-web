export const {
  NEXT_PUBLIC_BACKEND_URL: BACKEND_URL = 'http://localhost:1337',
} = process.env;

export const CLIENT_TYPES = {
  desktop: 'desktop',
  mobile: 'mobile',
  web: 'web',
};

export const CLIENT_TYPE = CLIENT_TYPES.web;

export const COOKIE_NAME = 'token';

export const RESPONSE_MESSAGES = {
  accessDenied: 'ACCESS_DENIED',
  emailAlreadyInUse: 'EMAIL_ALREADY_IN_USE',
  internalServerError: 'INTERNAL_SERVER_ERROR',
  invalidData: 'INVALID_DATA',
  missingData: 'MISSING_DATA',
  tooManyRequests: 'TOO_MANY_REQUESTS',
};

export const TOKEN_NAME = 'token';
