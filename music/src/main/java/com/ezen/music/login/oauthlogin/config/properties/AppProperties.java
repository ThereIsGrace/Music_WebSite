package com.ezen.music.login.oauthlogin.config.properties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.ArrayList;
import java.util.List;

@Getter
@ConfigurationProperties(prefix = "app") // yml 파일에 있는 "app"에 대하여 바인딩
public class AppProperties {
    // ConfigurationProperties는 *.properties나 *.yml에 있는 property를 바인딩해서 사용할 수 있게 해준다.
    private final Auth auth = new Auth();
    private final OAuth2 oauth2 = new OAuth2();

    // 일반 회원가입한 사용자에 대한 Jwt 토큰이 존재하고
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Auth {
        private String tokenSecret;
        private long tokenExpiry;
        private long refreshTokenExpiry;
    }

    // OAuth2 방식으로 로그인한 사용자에 대한 OAuth2 클래스가 존재한다.
    public static final class OAuth2 {

        // 인가된 Redirect Uri에 대한 리스트를 담을 객체를 생성
        private List<String> authorizedRedirectUris = new ArrayList<>();

        // 인가된 Redirect Uri 리스트 반환
        public List<String> getAuthorizedRedirectUris() {
            return authorizedRedirectUris;
        }


        // 인가된 Redirect Uri 정보를 반환하는 OAuth2
        public OAuth2 authorizedRedirectUris(List<String> authorizedRedirectUris) {
            this.authorizedRedirectUris = authorizedRedirectUris;
            return this;
        }
    }
}
