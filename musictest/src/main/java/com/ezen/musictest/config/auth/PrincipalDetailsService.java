package com.ezen.musictest.config.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.ezen.musictest.config.jwt.JwtProperties;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

@Service
public class PrincipalDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userEntity = userRepository.findByUsername(username);
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
    public void logout(HttpServletRequest request) {
        try {
          /*  checkHeaderValid(request);
            String refreshJwtToken = request
                    .getHeader(JwtProperties.REFRESH_HEADER_PREFIX)
                    .replace(JwtProperties.TOKEN_PREFIX, "");
            removeRefreshToken(refreshJwtToken);*/
        } catch (Exception e) {

        }
    }

    public void checkHeaderValid(HttpServletRequest request) {
        /*  String accessJwt = request.getHeader(JwtProperties.HEADER_PREFIX);
        String refreshJwt = request.getHeader(JwtProperties.REFRESH_HEADER_PREFIX);

        if (accessJwt == null) {

        } else if (refreshJwt == null) {
        }*/
    }


    public boolean isNeedToUpdateRefreshToken(String token) {
        try {
            Date expiresAt = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET))
                    .build()
                    .verify(token)
                    .getExpiresAt();

            Date current = new Date(System.currentTimeMillis());
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(current);
            calendar.add(Calendar.DATE, 1);

            Date after1dayFromToday = calendar.getTime();

            // 1일 이내에 만료
            if (expiresAt.before(after1dayFromToday)) {
//                log.info("리프레쉬 토큰 7일 이내 만료");
                return true;
            }
        } catch (TokenExpiredException e) {
            return true;
        }
        return false;
    }


    public Boolean refreshTokenValidation(String token) {

        // DB에 저장한 토큰 비교
        Optional<User> user = Optional.ofNullable(getMemberByRefreshToken(token));

        if(user != null)
            return true;

        return false;

    }


}
