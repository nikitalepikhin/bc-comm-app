package com.nikitalepikhin.bccommapp.service;

import com.nikitalepikhin.bccommapp.model.StatusLookup;
import com.nikitalepikhin.bccommapp.model.StatusValueType;

public interface StatusService {
    StatusLookup findByValue(StatusValueType value);
}
