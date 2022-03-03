package com.nikitalepikhin.bccommapp.exception;

import org.springframework.security.core.AuthenticationException;

public class RefreshTokenException extends AuthenticationException {

    public RefreshTokenException(String msg) {
        super(msg);
    }
}
