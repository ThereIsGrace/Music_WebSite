package com.ezen.music.login.jwtlogin.controller;

import com.ezen.music.login.oauthlogin.api.entity.user.User;
import com.ezen.music.login.oauthlogin.api.service.UserService;
import com.ezen.music.login.oauthlogin.oauth.service.CustomUserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping
@Controller
public class UserController {

    CustomUserDetailsService service;

    @PostMapping("/join")
    public String join(User user){
        service.loadUserByUsername(user.getUsername());
        return "redirect:/loginForm";
    }

    @GetMapping("/joinForm")
    public String joinForm(){
        return "joinForm";
    }

    @GetMapping("loginForm")
    public String loginForm(){
        return "loginForm";
    }

    @PostMapping("/login2")
    public @ResponseBody String login(User user){
        return "로그인 완성";
    }

}
