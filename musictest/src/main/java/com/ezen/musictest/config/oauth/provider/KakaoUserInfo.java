package com.ezen.musictest.config.oauth.provider;

import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;

import java.util.Map;


@NoArgsConstructor
public class KakaoUserInfo implements OAuth2UserInfo{
    private Map<String, Object> attributes;  //oauth2User.getAttributes();
    private Map<String, Object> properties;
    private Map<String, Object> kakao_account;


    public KakaoUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
        this.properties = (Map<String, Object>) attributes.get("properties");
        this.kakao_account = (Map<String, Object>) attributes.get("kakao_account");
    }
    @Override
    public String getProviderId() {
        return attributes.get("id") + "";
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getEmail() {
        return (String) kakao_account.get("email");
    }

    @Override
    public String getName() {
        return (String) properties.get("nickname");
    }

    @Override
    public String getProfileImage() {
        return (String) properties.get("profile_image");
    }
}
