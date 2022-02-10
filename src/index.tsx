import { StrictMode } from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { App } from './App';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { store } from './store';
import { AudioGamePage } from './views/Games/AudioGame/AudioGamePage';
import { GamesPage } from './views/Games/GamesPage/GamesPage';
import { AppSprint } from './views/Games/GamesPage/sprint/app-sprin';
import { Levels } from './views/Games/GamesPage/sprint/levels';
import { HomePage } from './views/Home/HomePage/HomePage';
import { LoginPage } from './views/Login/LoginPage/LoginPage';
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
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/statistics"
              element={
                <PrivateRoute>
                  <StatisticsPage />
                </PrivateRoute>
              }
            />
            <Route path="/games" element={<GamesPage />} />

            <Route path="/games/sprint/levels" element={<Levels />} />

            <Route path="/games/sprint" element={<AppSprint />}>
              <Route path="category">
                <Route path=":categoryId" element={<AppSprint />}>
                  <Route path="page/:page" element={<AppSprint />} />
                </Route>
              </Route>
            </Route>

            <Route path="/games/audio" element={<AudioGamePage />}>
              <Route path="category">
                <Route path=":categoryId" element={<AudioGamePage />}>
                  <Route path="page/:page" element={<AudioGamePage />} />
                </Route>
              </Route>
            </Route>

            <Route path="/textbook" element={<TextbookPage />}>
              <Route path="/textbook" element={<TextbookCategoriesPage />} />
              <Route path="/textbook/category/">
                <Route path=":categoryId" element={<TextbookCategoryPage />} />
                <Route
                  path=":categoryId/page/:page"
                  element={<TextbookCategoryPage />}
                />
              </Route>
              <Route
                path="/textbook/difficult"
                element={
                  <PrivateRoute>
                    <TextbookDifficultPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/textbook/known"
                element={
                  <PrivateRoute>
                    <TextbookKnownPage />
                  </PrivateRoute>
                }
              />
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
