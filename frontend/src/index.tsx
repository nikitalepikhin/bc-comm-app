import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

ReactDOM.render(
  <React.StrictMode>
    <div className="bg-gray-100 text-gray-900">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/signup'} element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
