package com.ezen.musictest.repository;

import com.ezen.musictest.domain.Heart;
import com.ezen.musictest.domain.Review;
import com.ezen.musictest.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeartRepository extends JpaRepository<Heart, Long> {

    @Query(value = "select count(*) from heart where user_id =:userId and review_id =:reviewId", nativeQuery = true)
    public int existsByUserIdAndReviewId(Long userId, Long reviewId);

    public Heart findByReviewAndUser(Review review, User user);
}
