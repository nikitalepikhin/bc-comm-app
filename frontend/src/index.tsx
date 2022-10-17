import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import "./inter.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./common/components/ErrorPage";
import { IndexPage } from "./common/components/IndexPage";
import SchoolsRoutes from "./features/schools/SchoolsRoutes";
import FacultiesRoutes from "./features/faculties/FacultiesRoutes";
import ChannelsRoutes from "./features/channels/ChannelsRoutes";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<IndexPage />} />
            <Route path="schools/*" element={<SchoolsRoutes />} />
            <Route path="faculties/school/*" element={<FacultiesRoutes />} />
            <Route path="channels/*" element={<ChannelsRoutes />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
