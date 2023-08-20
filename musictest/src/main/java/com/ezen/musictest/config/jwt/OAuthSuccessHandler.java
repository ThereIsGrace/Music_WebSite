package com.ezen.musictest.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ezen.musictest.config.auth.PrincipalDetails;
import com.ezen.musictest.config.auth.PrincipalDetailsService;
import com.ezen.musictest.config.oauth.PrincipalOauth2UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Component
public class OAuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private PrincipalDetailsService principalDetailsService;


    public OAuthSuccessHandler(PrincipalDetailsService principalDetailsService){
        this.principalDetailsService = principalDetailsService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        String jwtToken = principalDetailsService.createhAccessToken(principalDetails.getUser());
        /*JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("id", principalDetails.getUser().getId())
                .withClaim("username", principalDetails.getUsername())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
*/
        String jwtToken2 = principalDetailsService.createRefreshToken(principalDetails.getUser());
                /*JWT.create()
                .withSubject(JwtProperties.REFRESH_TOKEN)
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.REFRESH_EXPIRATION_TIME))
                .withClaim("id", principalDetails.getUser().getId())
                .withClaim("username", principalDetails.getUsername())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
*/
        principalDetailsService.setRefreshToken(principalDetails.getUser().getUsername(),jwtToken2);

        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
        response.addHeader(JwtProperties.REFRESH_TOKEN, JwtProperties.TOKEN_PREFIX + jwtToken2);

        response.sendRedirect("http://localhost:3000/sociallogin?token="+jwtToken);
    }
}

