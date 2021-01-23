import { TOKEN_NAME } from '../configuration';

export default function saveToken(token: string): Error | void {
  if (!token) {
    throw new Error('Token string is required!');
  }

  localStorage.setItem(TOKEN_NAME, token);
}
