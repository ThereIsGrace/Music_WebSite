import axios from "axios";
import { Cookies } from "react-cookie";

const { SERVER_URL } = require("@/constants")

const { Navigate } = require("react-router-dom");


const SocialLogin = (props) => {
    const getUrlParameter = (name) => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        return params.get(name);
    };

    const token = getUrlParameter("token");

    console.log("토큰 파싱: " + token);

    if (token){
        console.log("axios header에 토큰 저장" + token);
        axios.defaults.headers.common["accessToken"] = token;
        console.log(axios.defaults.headers.common['accessToken'], ' 액세스 토큰 다시 설정했음');
        const cookies = new Cookies();
        cookies.set('ILOGIN', 'Y');
        return(
            <Navigate
            to={{
                pathname: "/",
                state: { from: props.location }
            }}
            />
        )
    }else{
        return(
            <Navigate 
                to={{
                    pathname: "/login",
                    state: { from: props.location }
                }}
            />
        )
    }
}

export default SocialLogin;