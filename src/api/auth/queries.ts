import axios from 'axios';

import { LOCAL_STORAGE_KEYS, setLocalStorageItem } from '../../utils/localStorage.ts';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export const exchangeCodeForTokens = async (code: string) => {
  const tokenUrl = 'https://oauth2.googleapis.com/token';

  const params = new URLSearchParams({
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  });

  try {
    const response = await axios.post(tokenUrl, params);
    const data = response.data;

    if (data.access_token) {
      setLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, data.access_token);

      if (data.refresh_token) {
        setLocalStorageItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
      }

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
    } else {
      throw new Error('Failed to retrieve access token');
    }
  } catch (error: unknown) {
    throw new Error(`Error exchanging code for tokens: ${error}`);
  }
};
