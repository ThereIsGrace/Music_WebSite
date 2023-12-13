package com.ezen.musictest.repository;

import com.ezen.musictest.domain.Board;
import com.ezen.musictest.domain.Cart;
import com.ezen.musictest.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    Page<Cart> findAllByUser(User user, Pageable pageable);

    @Query(value = "select count(*) from cart where user =:user", nativeQuery = true)
    public int countCartByUser(User user);
}
