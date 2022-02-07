import { StrictMode } from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { App } from './App';
import { store } from './store';
import { GamesPage } from './views/Games/GamesPage/GamesPage';
import { HomePage } from './views/Home/HomePage/HomePage';
import { StatisticsPage } from './views/Statistics/StatisticsPage/StatisticsPage';
import { TextbookCategoriesPage } from './views/Textbook/TextbookCategoriesPage/TextbookCategoriesPage';
import { TextbookCategoryPage } from './views/Textbook/TextbookCategoryPage/TextbookCategoryPage';
import { TextbookDifficultPage } from './views/Textbook/TextbookDifficultPage/TextbookDifficultPage';
import { TextbookKnownPage } from './views/Textbook/TextbookKnownPage/TextbookKnownPage';
import { TextbookPage } from './views/Textbook/TextbookPage/TextbookPage';
// import './utils/helpers/taskCheck';

render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/textbook" element={<TextbookPage />}>
              <Route path="/textbook" element={<TextbookCategoriesPage />} />
              <Route
                path="/textbook/category/:categoryId"
                element={<TextbookCategoryPage />}
              />
              <Route
                path="/textbook/difficult"
                element={<TextbookDifficultPage />}
              />
              <Route path="/textbook/known" element={<TextbookKnownPage />} />
            </Route>
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>404</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
