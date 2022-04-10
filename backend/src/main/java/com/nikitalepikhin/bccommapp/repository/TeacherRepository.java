package com.nikitalepikhin.bccommapp.repository;

import com.nikitalepikhin.bccommapp.model.Teacher;
import org.springframework.data.repository.CrudRepository;

public interface TeacherRepository extends CrudRepository<Teacher, Long> {
}
