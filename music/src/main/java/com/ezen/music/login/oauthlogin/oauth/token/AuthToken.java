package com.ezen.music.login.oauthlogin.oauth.token;

import io.jsonwebtoken.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.security.Key;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
public class AuthToken {
    // 토큰 생성

    @Getter
    private final String token;
    private final Key key;

    private static final String AUTHORITIES_KEY = "role";

    // 권한이 부여되기 전 Jwt
    AuthToken(String id, Date expiry, Key key) {
        this.key = key;
        this.token = createAuthToken(id, expiry);
    }

    // 권한이 부여된 후 Jwt
    AuthToken(String id, String role, Date expiry, Key key) {
        this.key = key;
        this.token = createAuthToken(id, role, expiry);
    }

    // Jwt를 생성하는데 id를 집어넣고 HS256으로 사인한 후 토큰 만료기간을 설정하고
    // 토큰 생성
    // HS256은 HMAC(대칭키 암호화 알고리즘) + SHA256을 합친 것
    private String createAuthToken(String id, Date expiry) {
        return Jwts.builder()
                .setSubject(id)
                .signWith(key, SignatureAlgorithm.HS256)
                .setExpiration(expiry)
                .compact();
    }

    // Jwt를 생성할 때 권한을 같이 집어넣고 토큰 생성
    private String createAuthToken(String id, String role, Date expiry) {
        return Jwts.builder()
                .setSubject(id)
                .claim(AUTHORITIES_KEY, role)
                .signWith(key, SignatureAlgorithm.HS256)
                .setExpiration(expiry)
                .compact();
    }

    // 토큰의 내용이 null이 아니면 true 반환
    public boolean validate() {
        return this.getTokenClaims() != null;
    }

    // Jwt 검증하기
    // Jwt.parserBuilder() 메서드를 사용해서 JwtParserBuilder 인스턴스를 만들고
    // JWS 서명을 확인하는데 사용할 SecretKey를 지정
    // build()메서드를 호출하면 JwtParser 반환
    // 마지막으로 parseClaimsJwt(token)을 하면 오리지널 signed JWT가 반환
    // 그 토큰의 Claims를 반환
    public Claims getTokenClaims() {
        try {
            return Jwts.parserBuilder()    //토큰 내용 복호화
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SecurityException e) {
            log.info("Invalid JWT signature.");
        } catch (MalformedJwtException e) {
            log.info("Invalid JWT token.");
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            log.info("JWT token compact of handler are invalid.");
        }
        return null;
    }

    // 만료된 토큰 내용 검증
    public Claims getExpiredTokenClaims() {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
            return e.getClaims();
        }
        return null;
    }
}
