export enum LOCAL_STORAGE_KEYS {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

export const getLocalStorageItem = (key: LOCAL_STORAGE_KEYS) => window.localStorage.getItem(key) || '';

export const setLocalStorageItem = (key: LOCAL_STORAGE_KEYS, value: string) => window.localStorage.setItem(key, value);

export const removeLocalStorageItem = (key: LOCAL_STORAGE_KEYS) => window.localStorage.removeItem(key);

export const clearLocalStorage = () => {
  removeLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  removeLocalStorageItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
};
