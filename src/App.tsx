import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import { ModalContext } from './components/context/ModalContext';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Modal } from './components/Modal/Modal';
import { IModalData } from './types/modal';
import './App.scss';

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
          <div className="container">
            <Outlet />
          </div>
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
