package com.ezen.musictest.config.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.ezen.musictest.config.jwt.JwtProperties;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidParameterException;
import java.security.Key;
import java.security.SignatureException;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.Optional;

@Service
public class PrincipalDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userEntity = userRepository.findByUsername(username);
    //    userEntity = userRepository.findByUsername2(username);

        if(userEntity != null){

            return new PrincipalDetails(userEntity);
        }
        return null;
    }

    @Transactional(readOnly = true)
    public User getMemberByRefreshToken(String token) {
        return userRepository.findByRefreshToken(token);
    }

    @Transactional
    public void setRefreshToken(String username, String refreshJwt) {
        User user = userRepository.findByUsername(username);
        user.setRefreshToken(refreshJwt);
    }

    @Transactional
    public void removeRefreshToken(String token) {
        User user = userRepository.findByRefreshToken(token);
        user.setRefreshToken(token);
    }

    public String createhAccessToken(User user) {
        return   JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("id", user.getId())
                .withClaim("username",user.getUsername())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
    }

    public String createRefreshToken(User user) {
        return   JWT.create()
                .withSubject(JwtProperties.REFRESH_TOKEN)
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.REFRESH_EXPIRATION_TIME))
                .withClaim("id", user.getId())
                .withClaim("username",user.getUsername())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
    }
    public void logout(String token) {
        try {
//            checkHeaderValid(request);
           /* String refreshJwtToken = request
                    .getHeader(JwtProperties.REFRESH_HEADER_PREFIX)
                    .replace(JwtProperties.TOKEN_PREFIX, "");*/
            removeRefreshToken(token);
        } catch (Exception e) {

        }
    }

    public Boolean refreshTokenValidation(String token) {

        // DB에 저장한 토큰 비교
        Optional<User> user = Optional.ofNullable(getMemberByRefreshToken(token));

        if(user != null)
            return true;

        return false;

    }

    public Boolean isTokenExpired(String token){
        System.out.println("test");
        try {
            Date expiration = validTokenAndReturnBody(token).getExpiration();
            return expiration.before(new Date());
        }catch (Exception e) {
            return true;
        }

    }

    // 토큰 해석
    public Claims validTokenAndReturnBody(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(JwtProperties.SECRET.getBytes())
                    .parseClaimsJws(token)
                    .getBody();
        }
        catch(ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | IllegalArgumentException e ) {
            e.printStackTrace();
            throw new InvalidParameterException("유효하지 않은 토큰입니다");
        }
    }

}
