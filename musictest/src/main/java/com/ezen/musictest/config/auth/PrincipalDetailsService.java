package com.ezen.musictest.config.auth;

import com.ezen.musictest.domain.User;
import com.ezen.musictest.repository.UserRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public PrincipalDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("username :: {}", username);

        User user = userRepository.findByUsername(username);

        log.info("LOAD USER BY USERNAME = USER : {}, {}", user.getUsername(), user.getPassword());
        return new PrincipalDetails(user);
    }
}
