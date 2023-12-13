package com.ezen.musictest.repository;

import com.ezen.musictest.domain.SocialType;
import com.ezen.musictest.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    public User findByUsername(String username);
    public Boolean existsByEmail(String email);
    public Boolean existsByUsername(String username);
    public User findByUsernameAndPassword(String username, String password);
    public User findBySocialTypeAndSocialId(SocialType socialType, String socialId);
    public User findById(Long id);
}
