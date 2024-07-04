import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from "./Main";
import 'helpers/initFA';
import {router} from "./routes";
import {RouterProvider} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Main>
          <RouterProvider router={router}/>
      </Main>
  </React.StrictMode>
);
