import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {GlobalStyle} from "./GlobalStyle";
import {BrowserRouter} from "react-router-dom";
import {RecoilRoot} from "recoil";
import {HelmetProvider} from "react-helmet-async";
import {ScrollToTop} from "@/components";
import CookiesProvider from "react-cookie/cjs/CookiesProvider";
// 전역 axios 설정
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true; // withCredentials 전역 설정
// 교차 출처 사이에서 쿠키를 주고 받기 위해 전역 설정
// 클라이언트의 withCredential 옵션만 활성화 한채 서버에 cors 요청하게 되면 모두 거부됨.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <HelmetProvider>
      <CookiesProvider>
        <BrowserRouter>
          <ScrollToTop />
            <RecoilRoot>
              <GlobalStyle />
            <App />
          </RecoilRoot>
        </BrowserRouter>
      </CookiesProvider>
    </HelmetProvider>
  </>
);

reportWebVitals();
