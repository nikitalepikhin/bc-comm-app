package com.nikitalepikhin.bccommapp.security.exception;

import org.springframework.security.core.AuthenticationException;

public class GenericAuthenticationException extends AuthenticationException {

    public GenericAuthenticationException(String msg) {
        super(msg);
    }
}
