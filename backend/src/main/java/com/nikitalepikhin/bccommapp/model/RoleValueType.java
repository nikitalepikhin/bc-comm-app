package com.nikitalepikhin.bccommapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RoleValueType {
    ADMIN,
    REPRESENTATIVE,
    STUDENT,
    TEACHER;
}
