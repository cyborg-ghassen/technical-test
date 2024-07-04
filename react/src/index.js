import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Main from "./Main";
import 'helpers/initFA';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Main>
          <App />
      </Main>
  </React.StrictMode>
);
