package com.ezen.musictest.error;

public class InvalidLoginRequestException extends RuntimeException{
    public InvalidLoginRequestException() {
        super("Invalid login request. check the username and password");
    }
}
