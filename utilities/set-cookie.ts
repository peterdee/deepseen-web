import { COOKIE_NAME } from '../configuration';

export default function setCookie(token: string): Error | void {
  if (!token) {
    throw new Error('Token string is required!');
  }

  document.cookie = `${COOKIE_NAME}=${token}; max-age=${60 * 60 * 24 * 9999}; path=/`;
}
