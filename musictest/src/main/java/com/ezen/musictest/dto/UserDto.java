package com.ezen.musictest.dto;

import com.ezen.musictest.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private int id;
    private String username;
    private String password;
    private String email;
    private String mobile;
    private String name;
    private String role;  //ROLE_USER, ROLE_ADMIN
    private String profileImage;
    private String year;
    private String accessToken;
    private String refreshToken;

}


