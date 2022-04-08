package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.model.RoleLookup;
import com.nikitalepikhin.bccommapp.model.RoleValueType;

public interface RoleService {
    RoleLookup findByValue(RoleValueType role);
}
