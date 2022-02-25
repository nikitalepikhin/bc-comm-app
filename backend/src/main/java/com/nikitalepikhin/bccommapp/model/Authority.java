package com.nikitalepikhin.bccommapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Authority {
    DUMMY_READ("dummy_read"),
    DUMMY_WRITE("dummy_write");

    private final String authority;
}
