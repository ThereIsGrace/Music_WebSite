package com.ezen.musictest.config.oauth.provider;

import java.util.Map;

public class NaverUserInfo implements OAuth2UserInfo{

    private Map<String, Object> attributes;  //oauth2User.getAttributes();

    // {id=kZXBKE5Zit01CccWcIq-nRiNOFpugSlaHXulBaSFyZE, email=universe2879@gmail.com, name=오선임}
    public NaverUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
    @Override
    public String getProviderId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getProvider() {
        return "naver";
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

}
