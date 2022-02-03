import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '..';
import { IModalData } from '../../components/Modal/Modal';

interface IModalState {
  isModalOpen: boolean;
  modalData: IModalData;
}

const initialState: IModalState = {
  isModalOpen: false,
  modalData: {},
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => {
      state.isModalOpen = true;
    },
    close: (state) => {
      state.isModalOpen = false;
    },
    setData: (state, action: PayloadAction<IModalData>) => {
      state.modalData = action.payload;
    },
    resetData: (state) => {
      state.modalData = {};
    },
  },
});

export const { open, close, setData, resetData } = slice.actions;
export const selectModalData = (state: RootState) => state.modal;
export const modalReducer = slice.reducer;
