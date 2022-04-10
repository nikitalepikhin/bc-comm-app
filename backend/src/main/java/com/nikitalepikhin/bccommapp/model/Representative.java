package com.nikitalepikhin.bccommapp.model;

import com.nikitalepikhin.bccommapp.model.entity.EmployeeEntity;
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
@Table(name = "representatives")
public class Representative implements UserEntity, EmployeeEntity {

    @Id
    private Long id;

    @Embedded
    private BaseEntityUser baseEntityUser;

    @Embedded
    private BaseEntityEmployee baseEntityEmployee;

    @MapsId
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
