import { TOKEN_NAME } from '../configuration';

export default function deleteCookie(): void {
  localStorage.removeItem(TOKEN_NAME);
}
