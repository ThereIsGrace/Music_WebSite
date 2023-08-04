package com.ezen.music.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
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

    @CreatedDate
    @Column(name = "regidate", updatable = false)
    private LocalDateTime regidate;

    @LastModifiedDate
    @Column(name = "updatedate")
    private LocalDateTime updatedate;

    private String image;

    @Enumerated(EnumType.ORDINAL)
    private MemberStatus status;

}
