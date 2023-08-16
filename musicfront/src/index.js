import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {GlobalStyle} from "./GlobalStyle";
import {BrowserRouter} from "react-router-dom";
import {RecoilRoot} from "recoil";
import {HelmetProvider} from "react-helmet-async";
import {ScrollToTop} from "@/components";
// 전역 axios 설정
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <RecoilRoot>
          <GlobalStyle />
          <App />
        </RecoilRoot>
      </BrowserRouter>
    </HelmetProvider>
  </>
);

reportWebVitals();
