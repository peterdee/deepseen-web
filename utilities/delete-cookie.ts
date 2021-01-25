import { COOKIE_NAME } from '../configuration';
import getToken from './get-token';

export default function deleteCookie(): void {
  const token = getToken();
  document.cookie = `${COOKIE_NAME}=${token}; max-age=${0}; path=/`;
}
