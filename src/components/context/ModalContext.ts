import { createContext } from 'react';

import { IModalData } from '../../types/modal';

interface IModalContext {
  setModalData: (data: IModalData) => void;
  setModalOpen: (value: boolean) => void;
}

export const ModalContext = createContext<IModalContext>({
  setModalData: () => {},
  setModalOpen: () => {},
});
