import { Tokens } from '../types/RSLangApi';
import { UsersApi } from './RSLangApi/UsersApi';
import { Storage } from './Storage';

const LOCAL_STORAGE_KEY = 'user';

type UserData = {
  message: string;
  name: string;
  refreshToken: string;
  token: string;
  userId: string;
};

export const User = {
  // getUsersApiInstance(Class: any) {
  //   return new Class(this.getId(), this.getTokens, this.setTokens);
  // },

  isGuest() {
    return !Storage.exists(LOCAL_STORAGE_KEY);
  },

  getId() {
    const storedData = User.getStoredData() as UserData;
    return storedData.userId;
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
    Storage.set(LOCAL_STORAGE_KEY, { ...storedData, ...tokens });
  },

  getStoredData() {
    return Storage.get(LOCAL_STORAGE_KEY);
  },

  login(data: {}) {
    Storage.set(LOCAL_STORAGE_KEY, data);
  },

  logout() {
    Storage.remove(LOCAL_STORAGE_KEY);
  },
};
