package com.ezen.musictest.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum JwtErrorCode {

    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, 1,"Token expired"),
    TOKEN_MALFORMED(HttpStatus.FORBIDDEN, 2,"Malformed token"),
    TOKEN_WRONG_SIGNATURE(HttpStatus.BAD_REQUEST, 3,"Wrong token signature"),
    TOKEN_METHOD(HttpStatus.METHOD_NOT_ALLOWED, 4 , "refresh token null");

    private final HttpStatus httpStatus;
    private final Integer code;
    private final String message;
}
