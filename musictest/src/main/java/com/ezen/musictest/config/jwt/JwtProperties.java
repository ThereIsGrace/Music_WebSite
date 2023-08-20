package com.ezen.musictest.config.jwt;

public interface JwtProperties {
    String SECRET = "GraceAndJoye";  // 우리 서버만 알고 있는 비밀값
    int EXPIRATION_TIME = 600000; //10분
//    int EXPIRATION_TIME = 60000; //10분


    int REFRESH_EXPIRATION_TIME = 86400000 ; //하루



    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";

    String REFRESH_TOKEN = "refreshToken";
}
