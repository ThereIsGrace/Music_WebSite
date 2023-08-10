package com.ezen.music.login.oauthlogin.api.repository.user;

import com.ezen.music.login.oauthlogin.api.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);
}
