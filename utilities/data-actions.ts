type Data = number | string | object | null;

export const getData = (key: string): Data | null => {
  const parsed = JSON.parse(localStorage.getItem(key));
  return parsed.data || null;
};

export const saveData = (key: string, value: Data): void => localStorage.setItem(
  key,
  JSON.stringify({
    data: value,
  }),
);
