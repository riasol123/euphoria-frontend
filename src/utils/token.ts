const token = 'token';

export const hasToken = (): boolean => {
  return Boolean(localStorage.getItem(token));
};

export const getToken = (): string | undefined => {
    return localStorage.getItem(token) || undefined;
};

export const setToken = (value: string) => {
  localStorage.setItem(token, value);
};

export const removeToken = () => {
  localStorage.removeItem(token);
};
