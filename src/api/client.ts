import axios from 'axios';

import { clearLocalStorage, getLocalStorageItem, LOCAL_STORAGE_KEYS, setLocalStorageItem } from '../utils/localStorage';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const refreshAccessToken = async () => {
  const refreshToken = getLocalStorageItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  if (!refreshToken) {
    throw new Error('Refresh token is missing');
  }

  try {
    const tokenUrl = 'https://oauth2.googleapis.com/token';

    const params = new URLSearchParams({
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token',
    });

    const response = await axios.post(tokenUrl, params);

    const { access_token } = response.data;

    setLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, access_token);

    return access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);

        clearLocalStorage();
        throw refreshError;
      }
    }

    return Promise.reject(error);
  },
);
