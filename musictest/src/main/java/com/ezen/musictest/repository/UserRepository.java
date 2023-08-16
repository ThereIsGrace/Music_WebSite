package com.ezen.musictest.repository;

import com.ezen.musictest.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    public User findByUsername(String username);

    public User findByEmail(String email);
}
