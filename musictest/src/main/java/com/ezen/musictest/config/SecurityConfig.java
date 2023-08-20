package com.ezen.musictest.config;


import com.ezen.musictest.config.auth.PrincipalDetailsService;
import com.ezen.musictest.config.jwt.JwtAuthenticationFilter;
import com.ezen.musictest.config.jwt.JwtAuthorizationFilter;
import com.ezen.musictest.config.jwt.OAuthSuccessHandler;
import com.ezen.musictest.config.oauth.PrincipalOauth2UserService;
import com.ezen.musictest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;

@Configuration
@EnableWebSecurity  // 시큐리티 활성화 -> 기본 스프링 필터체인에 등록
public class SecurityConfig {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PrincipalDetailsService principalDetailsService;

    @Autowired
    private PrincipalOauth2UserService PrincipalOauth2UserService;

    @Autowired
    private CorsConfig corsConfig;

    public OAuthSuccessHandler oAuthSuccessHandler=new OAuthSuccessHandler();
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new MyCustomDsl())
                .and()
                .authorizeRequests(authorize -> authorize.antMatchers("/api/v1/user/**")
                        .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
                        .antMatchers("/api/v1/manager/**")
                        .access("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
                        .antMatchers("/api/v1/admin")
                        .access("hasRole('ROLE_ADMIN')")
                        .anyRequest().permitAll())
                  .oauth2Login()
                  .redirectionEndpoint()
                  .baseUri("/login/oauth2/code/*")
                .and()
                .userInfoEndpoint()
                .userService(PrincipalOauth2UserService)
                .and()
                .authorizationEndpoint()
                .baseUri("/auth/authorize")
                 .and()
                 .successHandler(oAuthSuccessHandler)
                 .and()
                 .exceptionHandling()
                 .authenticationEntryPoint(new Http403ForbiddenEntryPoint());

         return http.build();

    }

    public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity>{
        @Override
        public void configure(HttpSecurity http) throws Exception {
            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
            http
                    .addFilter(corsConfig.corsFilter())
                    .addFilter(new JwtAuthenticationFilter(authenticationManager))
                    .addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository,principalDetailsService));
        }
    }
}
