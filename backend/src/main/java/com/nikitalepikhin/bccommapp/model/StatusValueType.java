package com.nikitalepikhin.bccommapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusValueType {
    ACTIVE("active"),
    DISABLED("disabled"),
    BANNED("banned");

    private final String status;
}
