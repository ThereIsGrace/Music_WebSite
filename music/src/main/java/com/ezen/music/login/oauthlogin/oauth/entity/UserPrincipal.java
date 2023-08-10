package com.ezen.music.login.oauthlogin.oauth.entity;

import com.ezen.music.login.oauthlogin.api.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class UserPrincipal implements OAuth2User, UserDetails, OidcUser {   // OAuth2User, UserDetails를 동시 구현하는 UserPrincipal이 Authentication으로 로그인 정보로 저장된다.
    private final String userId;
    private final String password;
    private final ProviderType providerType;
    private final RoleType roleType;
    private final Collection<GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }


    @Override
    public String getName() {
        return userId;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    // 계정이 만료되지 않았는지
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정이 잠금 전환되지 않았는지
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 비밀번호 기간이 만료되지 않았는지
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 계정을 사용가능한지
    @Override
    public boolean isEnabled() {
        return true;
    }

    // 토큰에 저장된 값을 가져옴
    @Override
    public Map<String, Object> getClaims() {
        return null;
    }

    // 사용자 정보를 가져옴
    @Override
    public OidcUserInfo getUserInfo() {
        return null;
    }

    @Override
    public OidcIdToken getIdToken() {
        return null;
    }

    // 사용자 정보를 생성
    public static UserPrincipal create(User user) {
        return new UserPrincipal(
                user.getUserId(),
                user.getPassword(),
                user.getProviderType(),
                RoleType.USER,
                Collections.singletonList(new SimpleGrantedAuthority(RoleType.USER.getCode()))
        );
    }

    // attributes는 access token과 함께 얻어온 정보들. 이 정보와 함께 UserPrincipal이라는 객체를 만든다.
    public static UserPrincipal create(User user, Map<String, Object> attributes) {
        UserPrincipal userPrincipal = create(user);
        userPrincipal.setAttributes(attributes);

        return userPrincipal;
    }
}
