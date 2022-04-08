package com.nikitalepikhin.bccommapp.model;

import com.nikitalepikhin.bccommapp.model.entity.EmployeeEntity;
import com.nikitalepikhin.bccommapp.model.entity.NamedUserEntity;
import com.nikitalepikhin.bccommapp.model.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "teachers")
public class Teacher implements UserEntity, NamedUserEntity, EmployeeEntity {

    @Id
    private Long id;

    @Embedded
    private BaseEntityUser baseEntityUser;

    @Embedded
    private BaseEntityNamedUser baseEntityNamedUser;

    @Embedded
    private BaseEntityEmployee baseEntityEmployee;

    @MapsId
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "verified", nullable = false)
    private Boolean verified = false;
}