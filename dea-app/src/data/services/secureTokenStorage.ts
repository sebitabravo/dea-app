import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = '@token';

export const saveAuthToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getAuthToken = async (): Promise<string | null> => {
  return SecureStore.getItemAsync(TOKEN_KEY);
};

export const clearAuthToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};
