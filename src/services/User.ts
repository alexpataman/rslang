import { Tokens } from '../types/RSLangApi';
import { UsersApi } from './RSLangApi/UsersApi';
import { storage } from './Storage';

const key = 'user';

type UserData = {
  message: string;
  name: string;
  refreshToken: string;
  token: string;
  userId: string;
};

export const User = {
  isGuest() {
    return !storage.exists(key);
  },

  getName() {
    const storedData = User.getStoredData() as UserData;
    return storedData.name;
  },

  async getData() {
    const usersApi = new UsersApi(this.getTokens, this.setTokens);
    const storedData = User.getStoredData() as UserData;
    try {
      const result = await usersApi.getUser(storedData.userId);
      return result;
    } catch {
      throw new Error('Something went wrong');
    }
  },

  getTokens(): Tokens {
    const storedData = User.getStoredData() as UserData;
    return {
      token: storedData.token,
      refreshToken: storedData.refreshToken,
    };
  },

  setTokens(tokens: Tokens) {
    const storedData = User.getStoredData() as UserData;
    storage.set(key, { ...storedData, ...tokens });
  },

  getStoredData() {
    return storage.get(key);
  },

  login(data: {}) {
    storage.set(key, data);
  },

  logout() {
    storage.remove(key);
  },
};
