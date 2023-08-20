package com.ezen.musictest.repository;

import com.ezen.musictest.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface UserRepository extends JpaRepository<User, Integer> {

    public User findByUsername(String username);

    @Query(value = "select * from user u where username=:username", nativeQuery = true)
    public User findByUsername2(@Param("username") String username);


    public User findByEmail(String email);


    public User findByRefreshToken(String token);
}
