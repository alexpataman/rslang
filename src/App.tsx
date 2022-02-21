import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Modal } from './components/Modal/Modal';
import { ModalContext } from './context/ModalContext';
import { IModalData } from './types/modal';
import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const App = () => {
  const [modalData, setModalData] = useState<IModalData>({});
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const contextData = {
    setModalData: (data: IModalData) => {
      setModalData(data);
    },
    setModalOpen: (data: boolean) => {
      setModalOpen(data);
    },
  };

  return (
    <ModalContext.Provider value={contextData}>
      <div className="App">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />

        {isModalOpen && (
          <Modal
            open={isModalOpen}
            modalData={modalData}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </ModalContext.Provider>
  );
};
