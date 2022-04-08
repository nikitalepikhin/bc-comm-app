package com.nikitalepikhin.bccommapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RoleValueType {
    ADMIN("admin"),
    REPRESENTATIVE("representative"),
    STUDENT("student"),
    TEACHER("teacher");

    private final String role;
}
