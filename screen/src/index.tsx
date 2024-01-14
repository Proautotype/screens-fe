import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import routerConfig from "./router.config";
import Fallback from "./views/Fallback";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import NotificationProviderCtx from "./NotificationProviderCtx";
import {Provider} from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <NotificationProviderCtx>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider
          router={routerConfig}
          fallbackElement={<Fallback/>}
        />
      </LocalizationProvider>

    </NotificationProviderCtx>

    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

