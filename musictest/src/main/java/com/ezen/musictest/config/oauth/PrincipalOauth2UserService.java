package com.ezen.musictest.config.oauth;

import com.ezen.musictest.config.oauth.provider.OAuth2UserInfo;
import com.ezen.musictest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("getClientRegistration:" + userRequest.getClientRegistration());   // registrationId로 어떤 OAuth로 로그인했는지 확인 가능
        System.out.println("getAccessToken:" + userRequest.getAccessToken().getTokenValue()); // 우리는 getAttributes로 모든 정보를 받아오기에 getTokenValue를 할 필요가 없다.

        OAuth2User oauth2User = super.loadUser(userRequest);
        // 구글로그인 버튼 클릭 -> 구글로그인창 -> 로그인을 완료 -> code를 리턴(OAuth-Client 라이브러리) -> Access Token 요청
        // userRequest 정보 -> 회원프로필 받아야함(loadUser 함수) -> 구글로부터 회원프로필 받아준다.
        System.out.println("getAttributes:" + oauth2User.getAttributes());

        OAuth2UserInfo oAuth2UserInfo = null;





        return super.loadUser(userRequest);
    }
}
