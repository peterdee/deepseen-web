import { User } from '@/@types/user';

type Data = number | string | object | null | User;

export const getData = <T>(key: string): T | null => {
  const parsed = JSON.parse(localStorage.getItem(key));
  return parsed.data || null;
};

export const saveData = (key: string, value: Data): void => localStorage.setItem(
  key,
  JSON.stringify({
    data: value,
  }),
);
