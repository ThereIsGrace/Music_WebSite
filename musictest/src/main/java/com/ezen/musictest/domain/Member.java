package com.ezen.musictest.domain;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;



@Data
@RequiredArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
@DynamicUpdate
public class Member {

    @Id
    @Column(length = 100)
    private String id;

    @Column(length = 300)
    private String password;

    @Column(length = 100)
    private String name;

    @Column(length = 100)
    private String email;

    @Enumerated(EnumType.ORDINAL)
    private Grade grade;

    private String phone;

    private Date birth;

    @Enumerated(EnumType.ORDINAL)
    private RoleType role;

    @Column(name = "regidate", nullable=false, updatable = false)
    @CreatedDate
    private LocalDateTime regidate;


    @Column(name = "updatedate")
    @LastModifiedDate
    private LocalDateTime updatedate;

    private String image;

    @Enumerated(EnumType.ORDINAL)
    private MemberStatus status;

}
