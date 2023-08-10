package com.ezen.music.login.oauthlogin.api.service;

import com.ezen.music.login.oauthlogin.api.repository.user.UserRepository;
import com.ezen.music.login.oauthlogin.api.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }
}
