package com.nikitalepikhin.bccommapp.model_OLD;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Authority_OLD {
    DUMMY_READ("dummy_read"),
    DUMMY_WRITE("dummy_write");

    private final String authority;
}