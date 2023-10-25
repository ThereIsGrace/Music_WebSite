package com.ezen.musictest.controller;

import com.ezen.musictest.config.auth.PrincipalDetails;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.dto.LoginRequestDto;
import com.ezen.musictest.dto.UserRequestDto;
import com.ezen.musictest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.sql.SQLOutput;
import java.util.Base64;

@RestController
public class IndexController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/test/login")  // 이걸로 구글 로그인을 하면 에러가 남
    public String testLogin(Authentication authentication,
                                          @AuthenticationPrincipal PrincipalDetails userDetails) {  //DI(의존성 주입)  //UserDetails와 PrincipalDetails는 같은 타입이므로 치환하면 getUsername이 아니라 getUser가 가능
        System.out.println("/test/login ======================");
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("authentication:" + principalDetails.getUser());

        System.out.println("userDetails:" + userDetails.getUser());
        return "세션 정보 확인하기";
    }


    @GetMapping("/test/oauth/login")  // 이걸로 구글 로그인을 하면 에러가 남
    public String testOauthLogin(
            Authentication authentication,
            @AuthenticationPrincipal OAuth2User oauth) {  //DI(의존성 주입)  //UserDetails와 PrincipalDetails는 같은 타입이므로 치환하면 getUsername이 아니라 getUser가 가능
        System.out.println("/test/oauth/login ======================");
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        System.out.println("authentication:" + oauth2User.getAttributes());
        System.out.println("oauth2User:" + oauth.getAttributes());

        return "OAuth 세션 정보 확인하기";
    }

    // localhost:8094/
    // localhost:8094
    @GetMapping({"","/"})
    public @ResponseBody String index() {
        // 머스테치 기본폴더 src/main/resources/
        // 뷰리졸버 설정: templates (prefix), .mustache (suffix) 생략가능!!
        System.out.println("Something");
        return "index";  //src/main/resources/templates/index.mustache

    }


    // my page에 접속한 사용자를 위해 user 정보를 반환한다.
    @GetMapping("/mypage")
    public User user(Authentication authentication,
                     @AuthenticationPrincipal PrincipalDetails userDetails) {
        //Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        //String username = auth.getName();
        //System.out.println(username);
        System.out.println("authentication:" + userDetails.getUser().getUsername());
        return userDetails.getUser();
    }

    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }

    @GetMapping("/manager")
    public @ResponseBody String manager() {
        return "manager";
    }

    // 스프링시큐리티 해당주소를 낚아채버림!! - SecurityConfig 파일 생성 후 작동안함
    /*
     * @GetMapping("/login") public @ResponseBody String login() { return "login"; }
     */



    @PostMapping("/register")
    public String join(@RequestPart(value="contentsData") UserRequestDto user, @RequestParam(value="file") MultipartFile file) {
//        System.out.println(user);
//        user.setRole("ROLE_USER");
//        String rawPassword = user.getPassword();
//        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
//        user.setPassword(encPassword);
//        userRepository.save(user);   //회원가입 잘됨. 비밀번호: 1234 => 시큐리티로 로그인을 할 수 없음. 이유는 패스워드가 암호화가 안 되었기 때문!!

//        System.out.println(file);

        user.setRole("ROLE_USER");
        System.out.println("username" + user.getUsername());
        System.out.println("name" + user.getName());
        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.setPassword(encPassword);



        String uploadPath = "D://test-image/";
        String fileName = file.getOriginalFilename();

        File file2 = new File(uploadPath, fileName);
        try{
            file.transferTo(file2);
        }catch(Exception e){
            System.out.println("error file transfer");
        }

        User user1 = User.builder()
                .role("ROLE_USER")
                .email(user.getEmail())
                .password(encPassword)
                .username(user.getUsername())
                .name(user.getName())
                .profileImage(uploadPath + fileName)
                .build();

        userRepository.save(user1);


        return "success";
    }


    @Secured("ROLE_ADMIN")
    @GetMapping("/info")
    public @ResponseBody String info() {
        return "개인정보";
    }

    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/data")
    public @ResponseBody String data() {
        return "데이터정보";
    }

    @GetMapping("/checkUsername")
    public String checkUser(String username){
        System.out.println(username);
        User userEntity = (User) userRepository.findByUsername(username);
        System.out.println(userEntity);
        if(userEntity!=null){
            return "true";
        }
        return "false";
    }

    @GetMapping("/checkUseremail")
    public String checkUserEmail(String email){
        System.out.println("checkUserEmail() init...........................................");
        System.out.println(email);
        User userEntity = (User) userRepository.findByEmail(email);
        System.out.println(userEntity);
        if(userEntity!=null){
            return "true";
        }
        return "false";
    }


}
