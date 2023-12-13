package com.ezen.musictest.service;

import com.ezen.musictest.domain.User;
import com.ezen.musictest.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

@Slf4j
@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 회원가입
    public User create(final User user){
        if(user == null || user.getUsername() == null){
            throw new RuntimeException("Invalid arguments");
        }
        final String username = user.getUsername();
        if(userRepository.existsByUsername(username)){
            log.warn("Username {}은 이미 존재합니다.",username);
            throw new RuntimeException("Username already exists");
        }

        return userRepository.save(user);
    }

    // 로그인
    public User getByCredentials(final String username, final String password){
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public Boolean emailCheck(String email){
        return userRepository.existsByEmail(email);
    }

    public Boolean usernameCheck(String username){
        return userRepository.existsByUsername(username);
    }

    public User getUserInfo(final String username){
        return userRepository.findByUsername(username);
    }

    public User saveUser(final User user){
        return userRepository.save(user);
    }

    public User findUser(String userId) {
        Long userId2 = Long.valueOf(userId);
        return userRepository.findById(userId2);
    }
}
