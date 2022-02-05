import { storage } from './Storage';

const key = 'user';

type UserData = {
  message: string;
  name: string;
  refreshToken: string;
  token: string;
  userId: string;
};

export class User {
  static isGuest() {
    return !storage.exists(key);
  }

  static getName() {
    const data = User.getData() as UserData;
    return data.name;
  }

  static getData() {
    return storage.get(key);
  }

  static login(data: {}) {
    storage.set(key, data);
  }

  static logout() {
    storage.remove(key);
  }
}
