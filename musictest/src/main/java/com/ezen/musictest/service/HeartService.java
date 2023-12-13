package com.ezen.musictest.service;

import com.ezen.musictest.domain.Heart;
import com.ezen.musictest.domain.Review;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.repository.HeartRepository;
import com.ezen.musictest.repository.ReviewRepository;
import com.ezen.musictest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HeartService {

    @Autowired
    private HeartRepository heartRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;
    @Transactional
    public void heartAdd(Long reviewId, String username){
        Heart heart = Heart.builder().review(reviewRepository.findById(reviewId).get()).user(userRepository.findByUsername(username)).build();
        heartRepository.save(heart);
    }

    @Transactional
    public void heartDelete(Long reviewId, String username){
        Review review = reviewRepository.findById(reviewId).get();
        User user = userRepository.findByUsername(username);

        Heart heartEntity = heartRepository.findByReviewAndUser(review, user);
        heartRepository.delete(heartEntity);
    }
}
