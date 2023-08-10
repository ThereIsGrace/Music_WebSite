package com.ezen.music.login.oauthlogin.oauth.service;

import com.ezen.music.login.oauthlogin.api.repository.user.UserRepository;
import com.ezen.music.login.oauthlogin.api.entity.user.User;
import com.ezen.music.login.oauthlogin.oauth.entity.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    // UserDetails는 사용자 정보를 담는데 사용한다.

    //Repository로 Bean으로 등록했기에 Autowired를 안 해도 쓸 수 있음.
    private final UserRepository userRepository;

    // 사용자 이름으로 사용자 정보를 회원명단에서 확인한 후 사용자 정보를 반환하는 메서드
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 사용자 id로 DB에서 사용자 정보를 찾음
        User user = userRepository.findByUserId(username);
        if (user == null) {  // 해당 아이디가 없을 때 사용자를 찾을 수 없다는 에러가 뜬다.
            throw new UsernameNotFoundException("Can not find username.");
        }

        // UserPrincipal이라고 불리는 UserDetaisl를 상속하는 사용자 정의 클래스가 있다.
        // UserDetialsService 사용자 정의에서 인스턴스를 반환할 클래스
        // user 객체에 저장된 정보를 사용하여 userPrincipal을 인증 및 권한을 부여한다.
        return UserPrincipal.create(user);
    }
}
