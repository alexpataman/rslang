import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '..';
import { User } from '../../services/User';

interface IUserState {
  isGuest: boolean;
}

const initialState: IUserState = {
  isGuest: User.isGuest(),
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    logout: (state) => {
      state.isGuest = true;
      User.logout();
    },
    login: (state, action: PayloadAction<{}>) => {
      state.isGuest = false;
      User.login(action.payload);
    },
  },
});

export const { login, logout } = slice.actions;
export const selectUserData = (state: RootState) => state.user;
export const userReducer = slice.reducer;
