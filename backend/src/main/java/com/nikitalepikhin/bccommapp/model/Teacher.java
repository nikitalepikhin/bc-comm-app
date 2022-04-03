package com.nikitalepikhin.bccommapp.model;

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
public class Teacher implements UserLikeEntity, TeacherLikeEntity {

    @Id
    private Long id;

    @Embedded
    private BaseEntityUser baseEntityUser;

    @Embedded
    private BaseEntityTeacher baseEntityTeacher;

//    @PrimaryKeyJoinColumn
    @MapsId
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}