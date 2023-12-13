package com.ezen.musictest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@Table(name="USERS")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id    // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;  // 아이디
    private String password;  // 비밀번호
    private String email;     // 이메일
    private String mobile;    // 전화번호
    private String name;    // 이름
    private String year;   // 생일
    private String profileImage;  // 프로필 이미지

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private SocialType socialType; // 소셜 로그인 제공자: KAKAO, NAVER, GOOGLE

    private String socialId; // 로그인한 소셜 타입의 식별자 값 (일반 로그인인 경우 null)

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Reply> reply;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Board> boardList;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<OrderNumber> orderNumberList;

    @CreationTimestamp
    private Timestamp createDate;

    // 비밀번호 암호화 메소드
    public void passwordEncode(BCryptPasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    //== 유저 필드 업데이트 ==//

    public void updateMobile(String mobile) {
        this.mobile = mobile;
    }

    public void updatePassword(String updatePassword, BCryptPasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(updatePassword);
    }

    public void updateName(String name, String profileImage) {
        this.name = name;
    }

    public void updateProfileImage(String profileImage){
        this.profileImage = profileImage;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", mobile='" + mobile + '\'' +
                ", name='" + name + '\'' +
                ", year='" + year + '\'' +
                ", profileImage='" + profileImage + '\'' +
                ", role=" + role +
                ", socialType=" + socialType +
                ", socialId='" + socialId + '\'' +
                ", createDate=" + createDate +
                '}';
    }
}