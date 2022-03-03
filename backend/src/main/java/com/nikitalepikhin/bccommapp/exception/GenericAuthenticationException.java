package com.nikitalepikhin.bccommapp.exception;

import org.springframework.security.core.AuthenticationException;

public class GenericAuthenticationException extends AuthenticationException {

    public GenericAuthenticationException(String msg) {
        super(msg);
    }
}
