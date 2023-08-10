package com.ezen.music.login.oauthlogin.oauth.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {
    //spring security는 초기화 진행이 되면 기본적으로 formLoginAuthentication(폼 로그인 인증) 방식과
    //HttpBasicAuthentication(http 베이직 인증) 방식을 설정하고 시작함
    //인증의 흐름이기 때문에 당연히 인증예외가 발생할 수 있다. 따라서 각가의 인증방식에서 그에 맞는 entryPoint가 설정되어야 하고
    //그래야 어떤 인증방식에 예외가 발생하더라도 그 인증예외에 대한 특별한 위치나 페이지에 대해서 해당 client 또는 사용자가 액션을 취할 수 있다.
    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) throws IOException, ServletException {
        authException.printStackTrace();
        log.info("Responding with unauthorized error. Message := {}", authException.getMessage());
        response.sendError(
                HttpServletResponse.SC_UNAUTHORIZED,
                authException.getLocalizedMessage()
        );
    }
}
