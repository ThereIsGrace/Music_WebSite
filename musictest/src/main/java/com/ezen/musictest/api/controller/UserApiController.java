package com.ezen.musictest.api.controller;

import com.ezen.musictest.config.auth.PrincipalDetails;
import com.ezen.musictest.domain.Role;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.dto.CMRespDto;
import com.ezen.musictest.dto.SubInfoDto;
import com.ezen.musictest.dto.UserDto;
import com.ezen.musictest.repository.BoardRepository;
import com.ezen.musictest.repository.CartRepository;
import com.ezen.musictest.repository.OrderNumberRepository;
import com.ezen.musictest.repository.ReplyRepository;
import com.ezen.musictest.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RestController
public class UserApiController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderNumberRepository orderNumberRepository;

    @Autowired
    private ReplyRepository replyRepository;

    @GetMapping("/")
    public String healthCheck(){
        System.out.println("잘 실행되는 중");
        return "This service is up and running";
    }

    @PostMapping("/register")
    public ResponseEntity<CMRespDto<String>> create(@ModelAttribute UserDto userDto){

        log.info("사용자 회원가입 시작");
        System.out.println("username: " + userDto.getUsername());
        System.out.println("name: " + userDto.getName());
        String rawPassword = userDto.getPassword();
        System.out.println("rawPassword: " + rawPassword);
        System.out.println("year: " + userDto.getYear());
        String encPassword = encoder.encode(rawPassword);
        userDto.setPassword(encPassword);


        User newUser = User.builder()
                .role(Role.USER)
                .email(userDto.getEmail())
                .mobile(userDto.getMobile())
                .password(encPassword)
                .username(userDto.getUsername())
                .name(userDto.getName())
                .profileImage(userDto.getProfileImage())
                .year(userDto.getYear())
                .build();
        userService.create(newUser);

        return ResponseEntity.ok().body(CMRespDto.<String>builder().code(1).message("성공적으로 회원가입이 완료되었습니다.").build());
    }

    @GetMapping("/register/checkUserEmail")
    public ResponseEntity<CMRespDto<String>> checkUserEmail(@RequestParam String email){
        log.info("checkUserEmail 시작");
        System.out.println("검증할 사용자 email : " + email);
        Boolean emailUsed = userService.emailCheck(email);
        if (emailUsed){
            return ResponseEntity.badRequest().body(CMRespDto.<String>builder().code(-1).message("해당 이메일이 존재합니다.").build());
        }else if(email == null || email.equals("")){
            return ResponseEntity.badRequest().body(CMRespDto.<String>builder().code(2).message("이메일은 공백일 수 없습니다.").build());
        }else {
            return ResponseEntity.ok().body(CMRespDto.<String>builder().code(1).message("해당 이메일이 사용가능합니다.").build());
        }
    }

    @GetMapping("/register/checkUsername")
    public ResponseEntity<CMRespDto<String>> checkUsername(String username){
        log.info("checkUsername 시작");
        System.out.println("검증할 사용자 username : " + username);
        Boolean emailUsed = userService.usernameCheck(username);
        if (emailUsed){
            return ResponseEntity.badRequest().body(CMRespDto.<String>builder().code(-1).message("해당 사용자명이 존재합니다.").build());
        }else if(username == null || username.equals("")){
            return ResponseEntity.badRequest().body(CMRespDto.<String>builder().code(2).message("사용자명은 공백일 수 없습니다.").build());
        }else {
            return ResponseEntity.ok().body(CMRespDto.<String>builder().code(1).message("해당 사용자명이 사용가능합니다.").build());
        }
    }

    @GetMapping("/user/myPage")
    public ResponseEntity<CMRespDto<User>> myPage(@AuthenticationPrincipal String username){
        log.info("my page 요청이 들어옴");
        log.info("{} 사용자에 대한 요청이 들어옴", username);
        User user = userService.getUserInfo(username);
        System.out.println(user);
        if(user == null){
            return ResponseEntity.badRequest().body(CMRespDto.<User>builder().code(-1).message("사용자의 정보를 찾지 못했습니다.").data(null).build());
        }
        return ResponseEntity.ok().body(CMRespDto.<User>builder().code(1).message("사용자의 정보를 찾았습니다.").data(user).build());
    }


    @GetMapping("/user/userInfo")
    public ResponseEntity<CMRespDto<User>> userInfo(@AuthenticationPrincipal String username){
        log.info("user 정보 요청이 들어옴");
        log.info("{} 사용자에 대한 요청이 들어옴", username);
        User user = userService.getUserInfo(username);
        return ResponseEntity.ok().body(CMRespDto.<User>builder().code(1).message("사용자의 정보를 찾았습니다.").data(user).build());
    }

    @GetMapping("/user/subInfo")
    public SubInfoDto subInfo(@AuthenticationPrincipal String username){
        User user = userService.getUserInfo(username);
        SubInfoDto subInfoDto = SubInfoDto.builder()
                .boardCount(boardRepository.countBoardByUser(user))
                .cartCount(cartRepository.countCartByUser(user))
                .replyCount(replyRepository.countReplyByUser(user))
                .orderCount(orderNumberRepository.countOrderNumberByUser(user)).build();
        return subInfoDto;
    }
}
