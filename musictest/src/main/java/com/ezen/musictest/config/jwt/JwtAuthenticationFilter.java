package com.ezen.musictest.config.jwt;

import com.ezen.musictest.config.auth.PrincipalDetails;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.dto.LoginRequestDto;
import com.ezen.musictest.error.InvalidLoginRequestException;
import com.ezen.musictest.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private boolean postOnly = true;

    private static final String AUTHENTICATION = "Authentication ";
    private static final String PREFIX_BEARER = "Bearer ";
    private static final String EXPIRE = "Expire ";

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
                                   JwtTokenProvider jwtTokenProvider,
                                   UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        log.info("Jwt Authentication Filter start....");

        try{
            LoginRequestDto creds = new ObjectMapper().readValue(request.getInputStream(), LoginRequestDto.class);

            return getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(creds.getUsername(), creds.getPassword(), null)
            );
        }catch(Exception e){
            throw new RuntimeException();
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        log.info("successful authentication");
        String username = authResult.getName();
        String accessToken = jwtTokenProvider.createAccessToken(username, authResult.getAuthorities());
        String refreshToken = jwtTokenProvider.createRefreshToken(username, authResult.getAuthorities());

        log.info("user {} logged in", username);

        ResponseCookie cookie = ResponseCookie.from("refresh-token", refreshToken)
                        .path("/")
                        .secure(true)      // https 환경에서만 쿠키가 발동
                        .sameSite("None")  // 동일 사이트와 크로스 사이트에 모두 쿠키 전송이 가능
                        .httpOnly(true)    // 브라우저에서 쿠키에 접근 불가
                        .build();

        response.setHeader("Set-Cookie", cookie.toString());

        response.getWriter().write(accessToken);
    }
}
