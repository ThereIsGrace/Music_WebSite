package com.ezen.musictest.service;

import com.ezen.musictest.domain.ReviewImages;
import com.ezen.musictest.repository.ReviewImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewImageService {

    @Autowired
    private ReviewImageRepository repository;
    @Transactional
    public void saveReview(List<ReviewImages> reviewImagesList){
        repository.saveAll(reviewImagesList);
    }
}
