package com.ezen.musictest.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Data
public class UserRequestDto {
    private int id;
    private String username;
    private String password;
    private String email;
    private String mobile;
    private String name;
    private String role;  //ROLE_USER, ROLE_ADMIN
    private File profileImage;
}
