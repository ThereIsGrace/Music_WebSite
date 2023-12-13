package com.ezen.musictest.config.jwt;

import com.ezen.musictest.config.auth.PrincipalDetailsService;
import com.ezen.musictest.service.UserService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.StringUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Key;

@Slf4j
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {


    private JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final PrincipalDetailsService principalDetailsService;

    @Value("${jwt.secret}")
    private String secret;

    private Key getSecretKey(){
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    public JwtAuthorizationFilter(AuthenticationManager authenticationManager,
                                  UserService userService,
                                  PrincipalDetailsService principalDetailsService,
                                  JwtTokenProvider jwtTokenProvider) {
        super(authenticationManager);
        this.userService = userService;
        this.principalDetailsService = principalDetailsService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException{
        log.info("Jwt Authorization filter start...");
        String tokenHeader = request.getHeader("Authorization");
        String jwtToken = null;
        log.info("jwtToken 직후", jwtToken);

        if (StringUtils.hasText(tokenHeader) && tokenHeader.startsWith("Bearer")){
            log.info(tokenHeader);
            jwtToken = tokenHeader.replace("Bearer ", "");
            System.out.println("jwtToken: " + jwtToken);
            try {
                String username = jwtTokenProvider.extractUsername(jwtToken);
            }catch(IllegalArgumentException e){
                logger.error("an error occured during extracting username from jwt access-token");
                throw new IllegalArgumentException("");
            }catch(ExpiredJwtException e){
                logger.warn("the token is expired and not valid anymore");
                throw new ExpiredJwtException(null, null, "");
            }catch(SignatureException e){
                logger.error("Authorization failed. Username or Password not valid.");
                throw new SignatureException("");
            }catch(MalformedJwtException e){
                logger.error("Malformed jwt token.");
                throw new MalformedJwtException("");
            }
        }

        log.info(tokenHeader);

        if (jwtToken != null && jwtTokenProvider.isValid(jwtToken)){
            SecurityContextHolder.getContext().setAuthentication(jwtTokenProvider.getAuth(jwtToken));
        }

        chain.doFilter(request, response);
    }
}
