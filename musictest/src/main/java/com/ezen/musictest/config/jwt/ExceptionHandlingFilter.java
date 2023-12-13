package com.ezen.musictest.config.jwt;

import com.ezen.musictest.error.JwtErrorCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;

import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class ExceptionHandlingFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("Exception filter start...");
        try {
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            log.info("exception filter - expired token");
            setErrorResponse(response, JwtErrorCode.TOKEN_EXPIRED);
        } catch (IllegalArgumentException e) {
            log.info("exception filter - wrong token");
            setErrorResponse(response, JwtErrorCode.TOKEN_WRONG_SIGNATURE);
        } catch (SignatureException e) {
            log.info("exception filter - wrong signature");
            setErrorResponse(response, JwtErrorCode.TOKEN_WRONG_SIGNATURE);
        } catch (MalformedJwtException e) {
            log.info("exception filter - malformed token");
            setErrorResponse(response, JwtErrorCode.TOKEN_MALFORMED);
        }
    }
    private void setErrorResponse(HttpServletResponse response, JwtErrorCode errorCode){
        ObjectMapper objectMapper = new ObjectMapper();
        response.setStatus(errorCode.getHttpStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ErrorResponse errorResponse = new ErrorResponse(errorCode.getCode(), errorCode.getMessage());
        try {
            log.info(errorResponse.getMessage());
            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
        }catch(IOException e){
            e.printStackTrace();
        }
    }

    @Data
    public static class ErrorResponse{
        private final Integer code;
        private final String message;
    }
}
