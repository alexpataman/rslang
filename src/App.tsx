import { Outlet } from 'react-router-dom';

import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Modal } from './components/Modal/Modal';
import { useAppSelector, useAppDispatch } from './store/hooks';
import * as modalSlice from './store/modal/modal.slice';
import './App.scss';

export const App = () => {
  const { isModalOpen, modalData } = useAppSelector(modalSlice.selectModalData);
  const dispatch = useAppDispatch();

  return (
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
          onClose={() => dispatch(modalSlice.close())}
        />
      )}
    </div>
  );
};
