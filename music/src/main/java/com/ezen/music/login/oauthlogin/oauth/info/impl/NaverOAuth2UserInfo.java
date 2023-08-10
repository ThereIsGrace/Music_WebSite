package com.ezen.music.login.oauthlogin.oauth.info.impl;

import com.ezen.music.login.oauthlogin.oauth.info.OAuth2UserInfo;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Slf4j
public class NaverOAuth2UserInfo extends OAuth2UserInfo {
    
    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }

        return (String) response.get("id");
    }

    @Override
    public String getName() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }

        return (String) response.get("nickname");
    }

    @Override
    public String getEmail() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }

        for(Map.Entry<String, Object>entrySet:response.entrySet()){
            System.out.println(entrySet.getKey());
        }
        return (String) response.get("email");
    }

    @Override
    public String getImageUrl() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }
        log.info((String) response.get("profile_image"));
        return (String) response.get("profile_image");
    }
}
