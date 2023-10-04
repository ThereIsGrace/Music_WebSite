const { Cookies } = require("react-cookie");
// 일반적으로 컴포넌트에 cookie를 설정하고, cookie를 쉽게 가져오기 위해서 유틸함수로 따로 관리하고,
// import하는 방법으로 사용된다.

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
    return cookies.set(name, value, {...options})
}

export const getCookie = (name) => {
    return cookies.get(name);
}

export const removeCookie = (name) => {
    return cookies.remove(name);
}
