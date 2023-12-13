package com.ezen.musictest.error;

public class BusinessLogicException extends Exception{
    private ExceptionCode exceptionCode;
    public BusinessLogicException(ExceptionCode errorCode) {
        this.exceptionCode = errorCode;
    }
}
