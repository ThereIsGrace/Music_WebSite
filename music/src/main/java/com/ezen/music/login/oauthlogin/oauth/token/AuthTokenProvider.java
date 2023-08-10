package com.ezen.music.login.oauthlogin.oauth.token;

import com.ezen.music.login.oauthlogin.oauth.exception.TokenValidFailedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
public class AuthTokenProvider {  // Jwt를 사용한 인증

    // 해싱에 사용할 비밀키 
    private final Key key;
    // 권한에 사용할 AUTHORITIES_KEY
    private static final String AUTHORITIES_KEY = "role";

    // 키를 태칭키 암호화 알고리즘으로 해싱해서 사용자 인증에 사용하겠다. 
    public AuthTokenProvider(String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    // id와 만기 , key를 넣어서 Jwt 반환
    public AuthToken createAuthToken(String id, Date expiry) {
        return new AuthToken(id, expiry, key);
    }

    // id와 권한, 만기를 넣어서 Jwt 반환
    public AuthToken createAuthToken(String id, String role, Date expiry) {
        return new AuthToken(id, role, expiry, key);
    }

    public AuthToken convertAuthToken(String token) {
        return new AuthToken(token, key);
    }

    // 토큰을 받아서 인증해 주는 메서드
    public Authentication getAuthentication(AuthToken authToken) {

        // 토큰에 내용이 존재하면
        if(authToken.validate()) {

            // 토큰의 키를 얻는다.
            Claims claims = authToken.getTokenClaims();
            // 권한을 확인한다.
            Collection<? extends GrantedAuthority> authorities =
                    Arrays.stream(new String[]{claims.get(AUTHORITIES_KEY).toString()})
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());

            log.debug("claims subject := [{}]", claims.getSubject());

            // OAuth2 방식이 아닌 일반 사용자 정보를 받아와서 권한을 넣어준다.
            User principal = new User(claims.getSubject(), "", authorities);

            // 스프링 시큐리티는 기본적으로 세션 쿠키 방식의 인증이 이루어진다. 이 인증이 이루어지는 필터는
            // UsernamePasswordAuthenticationFilter가 동작한다. UsernamePasswordAuthenticationFilter가 작동한다.
            // UsernamePasswordAuthenticationFilter에서 사용자 정보와 받은 Jwt 토큰을 검증해서 권한과 함께 새로운 Jwt 토큰을 발급

            return new UsernamePasswordAuthenticationToken(principal, authToken, authorities);
        } else {
            // 토큰의 내용이 존재하지 않으면 잘못된 토큰이라는 에러를 띄운다.
            throw new TokenValidFailedException();
        }
    }

}
