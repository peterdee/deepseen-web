export const {
  NEXT_PUBLIC_BACKEND_URL: BACKEND_URL = 'http://localhost:1337',
} = process.env;

export const CLIENT_TYPES = {
  desktop: 'desktop',
  mobile: 'mobile',
  web: 'web',
};

export const CLIENT_TYPE = CLIENT_TYPES.web;
