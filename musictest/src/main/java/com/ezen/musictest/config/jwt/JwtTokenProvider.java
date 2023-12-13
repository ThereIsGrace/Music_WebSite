package com.ezen.musictest.config.jwt;


import com.ezen.musictest.config.auth.PrincipalDetails;
import com.ezen.musictest.config.auth.PrincipalDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    private static final long ACCESS_TOKEN_EXPIRED_TIME = 1000L * 60 * 60;  // 1시간
    private static final long REFRESH_TOKEN_EXPIRED_TIME = 1000L * 60L * 60L * 24L * 7L;  // 7일  
    private final PrincipalDetailsService principalDetailsService;
    @Value("${jwt.secret}")
    private String secret;

    private Key getSecretKey(){
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public String createToken(String username, Collection<? extends GrantedAuthority> roles, long expiredTime){
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("roles", roles);
        Date date = new Date();

        Key secretKey = getSecretKey();

        String jwt = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(date)
                .setIssuer("Music Website")
                .setExpiration(new Date(date.getTime() + expiredTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        return jwt;
    }

    public String createAccessToken(String username, Collection<? extends GrantedAuthority> roles){
        return createToken(username, roles, ACCESS_TOKEN_EXPIRED_TIME);
    }

    public String createRefreshToken(String username, Collection<? extends GrantedAuthority> roles){
        return createToken(username, roles, REFRESH_TOKEN_EXPIRED_TIME);
    }

    public String extractUsername(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isValid(String jwtToken){
        boolean ret = true;

        Jws<Claims> jws = null;

        try{
            jws = Jwts.parserBuilder()
                    .setSigningKey(getSecretKey())
                    .build()
                    .parseClaimsJws(jwtToken);

            if (jws == null ||
                    jws.getBody().getSubject() == null ||
                    jws.getBody().getExpiration().before(new Date())){
                ret = false;
            }
        }catch(Exception e){
            ret = false;
        }
        return ret;
    }

    public Authentication getAuth(String jwtToken){
        System.out.println("getAuth 시작");
        PrincipalDetails user = (PrincipalDetails) principalDetailsService.loadUserByUsername(extractUsername(jwtToken));
        System.out.println("username" + user.getName());
        return new UsernamePasswordAuthenticationToken(user.getName(), null, user.getAuthorities());
    }
}