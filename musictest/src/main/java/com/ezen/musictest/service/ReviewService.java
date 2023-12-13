package com.ezen.musictest.service;

import com.ezen.musictest.domain.Review;
import com.ezen.musictest.repository.HeartRepository;
import com.ezen.musictest.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repository;

    final int PAGE_SIZE = 5;

    @Autowired
    private GoodsService goodsService;

    @Autowired
    private HeartRepository heartRepository;

    @Transactional
    public Review reviewSave(Review review){
        return repository.save(review);
    }

    @Transactional
    public List<Review> reviewList(Long goodsNo){
        return repository.findAllByGoods(goodsService.getGoodsDetail(goodsNo));
    }

    @Transactional
    public Iterable<Review> reviewListMain(int pageNo, Long goodsNo){
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE, Sort.by(Sort.Direction.DESC, "regidate"));
        Iterable<Review> reviewList = repository.findAllByGoods3(goodsService.getGoodsDetail(goodsNo), pageable);
        return reviewList;
    }

    @Transactional
    public Iterable<Review> reviewListMore(int pageNo, Long goodsNo){
        Pageable pageable = PageRequest.of(pageNo, 24, Sort.by(Sort.Direction.DESC, "regidate"));
        return repository.findAllByGoods2(goodsService.getGoodsDetail(goodsNo), pageable);
    }
}
