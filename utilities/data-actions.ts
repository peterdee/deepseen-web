export const getData = <T>(key: string): T | null => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key));
    return parsed?.data ?? null;
  } catch {
    return null;
  }
};

export const saveData = <T>(key: string, value: T): void => localStorage.setItem(
  key,
  JSON.stringify({
    data: value,
  }),
);
