package com.ezen.musictest.api.controller;

import com.ezen.musictest.config.jwt.JwtTokenProvider;
import com.ezen.musictest.domain.Role;
import com.ezen.musictest.domain.Test;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.dto.CMRespDto;
import com.ezen.musictest.dto.JwtTokenResponseDto;
import com.ezen.musictest.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.MalformedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@Slf4j
@RestController
public class SilentRefreshController {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @GetMapping("/silent-refresh")
    public void silentRefresh(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        log.info("Silent refresh start");
        Cookie[] cookies = request.getCookies();
        String refreshToken = "";
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh-token")) {
                refreshToken = cookie.getValue();
            }
        }
        String username = "";
        try{
            username = tokenProvider.extractUsername(refreshToken);
        }catch(RuntimeException e){
            System.out.println("잘못 발행되었소!!");
            System.out.println(e);
            throw new RuntimeException("잘못 발행된 refresh token");
        }

        User user = userService.getUserInfo(username);
        System.out.println("refreshToken: " + refreshToken);
        if (tokenProvider.isValid(refreshToken)) {
            log.info("refresh token is valid. access token reissue.");
            String userRole = user.getRole().getKey();

            List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
            grantedAuthorities.add(new SimpleGrantedAuthority(userRole));
            String newAccessToken = tokenProvider.createAccessToken(user.getUsername(), grantedAuthorities);
            Test test = Test.builder().accessToken(newAccessToken).build();
            
            response.getWriter().write(objectMapper.writeValueAsString(test));
        }else{
            log.info("잘못 발행된 refresh token. 로그인이 필요");
            throw new MalformedJwtException("잘못 발행된 refresh token");
        }
    }
}
