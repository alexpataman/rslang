import { configureStore } from '@reduxjs/toolkit';

import { modalReducer } from './modal/modal.slice';
import { userReducer } from './user/user.slice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
