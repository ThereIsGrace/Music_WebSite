package com.ezen.musictest.config.oauth.provider;

import lombok.Builder;

import java.util.Map;

public class NaverUserInfo implements OAuth2UserInfo{

    private Map<String, Object> attributes;  //oauth2User.getAttributes();
    private Map<String, Object> response;

    // {id=kZXBKE5Zit01CccWcIq-nRiNOFpugSlaHXulBaSFyZE, email=universe2879@gmail.com, name=오선임}
    public NaverUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
        this.response = (Map<String, Object>) attributes.get("response");
    }
    @Override
    public String getProviderId() {
        return response.get("id") + "";
    }

    @Override
    public String getProvider() {
        return "naver";
    }

    @Override
    public String getEmail() {
        return (String) response.get("email");
    }

    @Override
    public String getName() {
        return (String) response.get("name");
    }

    @Override
    public String getProfileImage() {
        return (String) response.get("profile_image");
    }

    public String getYear(){
        return (String) response.get("birthyear");
    }

    public String getMobile(){
        String mobile = (String) response.get("mobile");
        String mobile2 = mobile.replace("-","");
        return mobile2;
    }

    public String getBirthday(){
        return (String) response.get("birthday");
    }

}
