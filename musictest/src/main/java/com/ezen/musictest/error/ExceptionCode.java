package com.ezen.musictest.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ExceptionCode {
    /* 400 BAD_REQUEST : 잘못된 요청 */
    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
    PAY_CANCEL(HttpStatus.UNAUTHORIZED, "결제 취소"),
    /* 404 NOT_FOUND : Resource를 찾을 수 없음 */
    PAY_FAILED(HttpStatus.BAD_REQUEST, "결제 실패");

    private final HttpStatus httpStatus;
    private final String message;
}
