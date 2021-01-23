import { TOKEN_NAME } from '../configuration';

export default function getToken(): string {
  return localStorage.getItem(TOKEN_NAME);
}
