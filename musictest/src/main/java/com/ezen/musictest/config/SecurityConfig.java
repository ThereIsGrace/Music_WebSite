package com.ezen.musictest.config;


import com.ezen.musictest.config.auth.PrincipalDetailsService;
import com.ezen.musictest.config.handler.CustomAuthenticationFailureHandler;
import com.ezen.musictest.config.jwt.*;
import com.ezen.musictest.config.jwt.handler.CustomAuthenticationSuccessHandler;
import com.ezen.musictest.config.jwt.handler.OAuthSuccessHandler;
import com.ezen.musictest.domain.Role;
import com.ezen.musictest.global.oauth2.service.CustomOAuth2UserService;
import com.ezen.musictest.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{



    @Autowired
    private PrincipalDetailsService principalDetailsService;

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;
    @Bean
    public AuthenticationProvider authenticationProvider() {
        return new JwtAuthenticationProvider(principalDetailsService, bCryptPasswordEncoder());
    }
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(authenticationProvider());
        return authenticationManagerBuilder.build();
        //return super.authenticationManager();
    }
    @Autowired
    private JwtTokenProvider tokenProvider;




    @Autowired
    private OAuthSuccessHandler oAuthSuccessHandler;

    @Autowired
    private UserService userService;


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/logout","/product/**", "/boardlist/**");  // Spring Security 적용 제외 경로
    }

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//        AuthenticationManager authenticationManager = authenticationManager(http);
//        http
//                .addFilter(getJwtAuthenticationFilter(authenticationManager))
//                .addFilterBefore(getJwtAuthorizationFilter(authenticationManager), UsernamePasswordAuthenticationFilter.class);
//        http.addFilterAfter(new ExceptionHandlingFilter(), JwtAuthorizationFilter.class);
//        return http.build();
//    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        AuthenticationManager authenticationManager = authenticationManager(http);


        http.cors()
                .and()
                .csrf()
                .disable()
                .formLogin().disable()
                .httpBasic().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
//                .authenticationManager(authenticationManager)
                .authorizeRequests()
                .antMatchers("/","/login/**", "/register/**", "/auth/**","/api/goods/write","/silent-refresh", "/payment/**", "/reviewlist/**").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .addFilter(getJwtAuthenticationFilter(authenticationManager))
                .addFilterBefore(getJwtAuthorizationFilter(authenticationManager), UsernamePasswordAuthenticationFilter.class)
                .oauth2Login()
                .redirectionEndpoint()
                .baseUri("/login/oauth2/code/*")
                .and()
                .authorizationEndpoint()
                .baseUri("/auth/authorize")
                .and()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .successHandler(oAuthSuccessHandler)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new Http403ForbiddenEntryPoint());

        http.logout().logoutUrl("/user/logout").logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
                            .logoutSuccessHandler((request, response, authentication) -> {
                                log.info("로그아웃을 성공적으로 했습니다.");
                                response.setStatus(200);
        }).deleteCookies("refresh-token", "ILOGIN").and().csrf().disable();

        http.addFilterAfter(new ExceptionHandlingFilter(), JwtAuthorizationFilter.class);


    }

    @Configuration(proxyBeanMethods = false)
    public class MyFilterConfiguration {

        @Bean
        public FilterRegistrationBean<JwtAuthorizationFilter> registration(JwtAuthorizationFilter filter) {
            FilterRegistrationBean<JwtAuthorizationFilter> registration = new FilterRegistrationBean<>(filter);
            registration.setEnabled(false);
            return registration;
        }

    }



    @Bean
    public JwtAuthenticationFilter getJwtAuthenticationFilter(AuthenticationManager authenticationManager) throws Exception{
        JwtAuthenticationFilter filter = new JwtAuthenticationFilter(authenticationManager, tokenProvider, userService);
        filter.setAuthenticationManager(authenticationManager);
        filter.setAuthenticationFailureHandler(authenticationFailureHandler());
        filter.setAuthenticationSuccessHandler(authenticationSuccessHandler());
        return filter;
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler(){
        return new CustomAuthenticationFailureHandler();
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler(){
        return new CustomAuthenticationSuccessHandler();
    }

    @Bean
    public JwtAuthorizationFilter getJwtAuthorizationFilter(AuthenticationManager authenticationManager) throws Exception{
        JwtAuthorizationFilter filter = new JwtAuthorizationFilter(authenticationManager,
                userService, principalDetailsService, tokenProvider);
        return filter;
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
