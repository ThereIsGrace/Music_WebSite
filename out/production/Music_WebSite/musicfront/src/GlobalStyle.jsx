import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  
  h4 {
    font-size: 30px; 
  }

  body {
    box-sizing: border-box;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    
    * {
      // 클릭시 파란색 드래그 영역 방지 
      -webkit-user-select: none; /* webkit(safari, chrome) browsers */
      -moz-user-select: none; /* mozilla browsers */
      -ms-user-select: none; /* ms browsers */
      
      box-sizing: inherit;
      font-family: inherit;

      &::after, 
      &::before {
        box-sizing: inherit;
        font-family: inherit;
      }
    }

    a {
      text-decoration: none; 
    }

    button {
      cursor: pointer;
    }
  }
`;