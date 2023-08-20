package com.ezen.musictest.config.oauth;

import com.ezen.musictest.config.auth.PrincipalDetails;
import com.ezen.musictest.config.oauth.provider.FacebookUserInfo;
import com.ezen.musictest.config.oauth.provider.GoogleUserInfo;
import com.ezen.musictest.config.oauth.provider.NaverUserInfo;
import com.ezen.musictest.config.oauth.provider.OAuth2UserInfo;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("getClientRegistration:" + userRequest.getClientRegistration());  // registrationId로 어떤 OAuth로 로그인했는지 확인 가능
        System.out.println("getAccessToken:" + userRequest.getAccessToken().getTokenValue());  //우리는 getAttributes로 모든 정보를 받아오기에 getTokenValue를 할 필요가 없다.


        OAuth2User oauth2User = super.loadUser(userRequest);
        // 구글로그인 버튼 클릭 -> 구글로그인창 -> 로그인을 완료 -> code를 리턴(OAuth-Client 라이브러리) -> Access Token 요청
        // userRequest 정보 -> 회원프로필 받아야함(loadUser 함수) -> 구글로부터 회원프로필 받아준다.
        System.out.println("getAttributes:" + oauth2User.getAttributes());   //getAttributes 정보로 강제 회원가입을 시킨다.

        OAuth2UserInfo oauth2UserInfo = null;
        if(userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            System.out.println("구글 로그인 요청");
            oauth2UserInfo = new GoogleUserInfo(oauth2User.getAttributes());
        }else if(userRequest.getClientRegistration().getRegistrationId().equals("facebook")) {
            System.out.println("페이스북 로그인 요청");
            oauth2UserInfo = new FacebookUserInfo(oauth2User.getAttributes());
        }else if(userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            System.out.println("네이버 로그인 요청");
            oauth2UserInfo = new NaverUserInfo((Map<String, Object>) oauth2User.getAttributes().get("response"));
        }else {
            System.out.println("우리는 구글과 페이스북과 네이버만 지원해요 ㅎㅎㅎㅎ");
        }

//		String provider = userRequest.getClientRegistration().getRegistrationId();  // google
//		String providerId = oauth2User.getAttribute("sub");
//		String username = provider + "_" + providerId;   // google_117608030258681622221
//		String password = bCryptPasswordEncoder.encode("겟인데어");
//		String email = oauth2User.getAttribute("email");
//		String role = "ROLE_USER";


        String provider = oauth2UserInfo.getProvider();
        String providerId = oauth2UserInfo.getProviderId();
        String username = provider + "_" + providerId;
        String password = bCryptPasswordEncoder.encode("겟인데어");
        String email = oauth2UserInfo.getEmail();
        String role = "ROLE_USER";

        User userEntity = userRepository.findByUsername(username);
        if(userEntity == null) {
            System.out.println("로그인이 최초입니다.");
            userEntity = User.builder()
                    .username(username)
                    .password(password)
                    .email(email)
                    .role(role)
                    .provider(provider)
                    .providerId(providerId)
                    .build();
            userRepository.save(userEntity);
        }else {
            System.out.println("로그인을 이미 한적이 있습니다. 당신은 자동회원가입이 되어 있습니다.");
        }

        // 회원가입을 강제로 진행해볼 예정
        //return super.loadUser(userRequest);
        return new PrincipalDetails(userEntity, oauth2User.getAttributes());
    }
}
