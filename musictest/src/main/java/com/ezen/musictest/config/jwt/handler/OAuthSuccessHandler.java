package com.ezen.musictest.config.jwt.handler;

import com.ezen.musictest.config.auth.PrincipalDetails;
import com.ezen.musictest.config.jwt.JwtTokenProvider;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
@AllArgsConstructor
public class OAuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        OAuth2User user = (OAuth2User) authentication.getPrincipal();
        System.out.println("이건가?"+user);
        System.out.println(authentication.getName());
        String accessToken = jwtTokenProvider.createAccessToken(user.getName(), user.getAuthorities());
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getName(), user.getAuthorities());

        ResponseCookie cookie = ResponseCookie.from("refresh-token", refreshToken)
                .path("/")
                .secure(true)      // https 환경에서만 쿠키가 발동
                .sameSite("None")  // 동일 사이트와 크로스 사이트에 모두 쿠키 전송이 가능
                .httpOnly(true)    // 브라우저에서 쿠키에 접근 불가
                .build();
        response.setHeader("Set-Cookie", cookie.toString());

        response.sendRedirect("https://localhost:3000/socaillogin?token=" + accessToken);
    }
}
