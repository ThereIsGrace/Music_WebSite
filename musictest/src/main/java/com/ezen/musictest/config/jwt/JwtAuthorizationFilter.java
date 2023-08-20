package com.ezen.musictest.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ezen.musictest.config.auth.PrincipalDetails;
import com.ezen.musictest.config.auth.PrincipalDetailsService;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private UserRepository userRepository;


    private PrincipalDetailsService principalDetailsService;


    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository, PrincipalDetailsService principalDetailsService) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.principalDetailsService = principalDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("Token Authorization Started!!!");
        String header = request.getHeader(JwtProperties.HEADER_STRING);

        System.out.println("header:" + request);
        if (header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }
        System.out.println("header : " + header);

        String accessJwtToken = request
                .getHeader(JwtProperties.HEADER_STRING)
                .replace(JwtProperties.TOKEN_PREFIX, "");
        String refreshJwtToken = request
                .getHeader(JwtProperties.REFRESH_TOKEN)
                .replace(JwtProperties.TOKEN_PREFIX, "");

        if ((refreshJwtToken != null && principalDetailsService.refreshTokenValidation(refreshJwtToken) || accessJwtToken !=null)) {
            if(!validateToken(accessJwtToken,request) ) {
                String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(refreshJwtToken)
                        .getClaim("username").asString();
                String id = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(refreshJwtToken)
                        .getClaim("id").asString();

                User user = new User();
                user.setUsername(username);
                //user.setId(Integer.parseInt(id));
                accessJwtToken = principalDetailsService.createhAccessToken(user);
            }

            // 토큰 검증(이게 인증이기 때문에 AuthenticationManager도 필요 없음)
            // 내가 SecurityContext에 직접 접근해서 세션을 만들 때 자동으로 UserDetailsService에 있는
            // loadByUsername이 호출됨
            String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(accessJwtToken)
                    .getClaim("username").asString();

            System.out.println("authorize username:" + username);
            if (username != null) {
                User user = userRepository.findByUsername(username);

                if (principalDetailsService.isNeedToUpdateRefreshToken(refreshJwtToken)) {
                    refreshJwtToken = principalDetailsService.createRefreshToken(user);
                    response.addHeader(JwtProperties.REFRESH_TOKEN, JwtProperties.TOKEN_PREFIX + refreshJwtToken);
                    principalDetailsService.setRefreshToken(username, refreshJwtToken);
                }

                // 인증은 토큰 검증시 끝. 인증을 하기 위해서가 아닌 스프링 시큐리티가 수행해주는 권한 처리를 위해
                // 아래와 같이 토큰을 만들어서 Authentication 객체를 강제로 만들고 그걸 세션에 저장!
                PrincipalDetails principalDetails = new PrincipalDetails(user);
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        principalDetails,  // 나중에 컨트롤러에서 DI해서 쓸 때 사용하기 편함.
                        null,  // 패스워드는 모르니까 null 처리, 어차피 지금 인증하는게 아님
                        principalDetails.getAuthorities());


                // 강제로 시큐리티의 세션에 접근하여 값 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);

                response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + accessJwtToken);
                response.addHeader(JwtProperties.REFRESH_TOKEN, JwtProperties.TOKEN_PREFIX + refreshJwtToken);

            }
        }
        chain.doFilter(request,response);
    }

    public boolean validateToken(String token, HttpServletRequest request) {
        try {
            Jwts.parser().setSigningKey(JwtProperties.SECRET).parseClaimsJws(token);
            return true;
        } catch(SecurityException E) {
            return false;
        } catch(IllegalArgumentException e) {
            return false;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
