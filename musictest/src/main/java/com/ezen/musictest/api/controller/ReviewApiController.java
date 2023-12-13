package com.ezen.musictest.api.controller;

import com.ezen.musictest.domain.Goods;
import com.ezen.musictest.domain.OrderList;
import com.ezen.musictest.domain.Review;
import com.ezen.musictest.domain.ReviewImages;
import com.ezen.musictest.dto.ReviewRequestDto;
import com.ezen.musictest.repository.HeartRepository;
import com.ezen.musictest.repository.OrderListRepository;
import com.ezen.musictest.repository.OrderNumberRepository;
import com.ezen.musictest.repository.ReviewRepository;
import com.ezen.musictest.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ReviewApiController {

    @Autowired
    private GoodsService goodsService;

    @Autowired
    private UserService userService;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ReviewImageService reviewImageService;

    @Autowired
    private OrderListRepository orderListRepository;

    @Autowired
    private OrderListService orderListService;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private HeartRepository heartRepository;


    @PostMapping("/review/{orderList}/{id}")
    public void setReview(@PathVariable Long orderList, @PathVariable Long id, @AuthenticationPrincipal String username, @RequestBody ReviewRequestDto reviewRequestDto){
        System.out.println("리뷰 등록을 시작합니다.");
        Review review;
        System.out.println(reviewRequestDto.getFileList().toString());
        if (reviewRequestDto.getFileList().isEmpty()){
            review = Review.builder().goods(goodsService.getGoodsDetail(id)).user(userService.getUserInfo(username)).orderList(orderListRepository.findById(orderList).get())
                    .content(reviewRequestDto.getContent()).count(reviewRequestDto.getCount()).imageReview(false).build();
        }else {
            review = Review.builder().goods(goodsService.getGoodsDetail(id)).user(userService.getUserInfo(username)).orderList(orderListRepository.findById(orderList).get())
                    .content(reviewRequestDto.getContent()).count(reviewRequestDto.getCount()).imageReview(true).build();
        }
        List<String> fileList = reviewRequestDto.getFileList();

        Review reviewEntity = reviewService.reviewSave(review);
        List<ReviewImages> imageList = new ArrayList<>();
        for(String file: fileList){
            ReviewImages images = ReviewImages.builder().review(reviewEntity).url(file).build();
            imageList.add(images);
        }
        reviewImageService.saveReview(imageList);
        OrderList orderListEntity = orderListRepository.findById(orderList).get();
        orderListEntity.setReviewWritten(true);
        orderListRepository.save(orderListEntity);
        Goods goodsEntity = goodsService.getGoodsDetail(id);
        goodsEntity.setCount(reviewRepository.getAvgCount(goodsEntity));
        goodsEntity.setReviewNumber(goodsEntity.getReviewNumber() + 1);
        goodsService.상품등록(goodsEntity);
    }

    @GetMapping("/reviewlist/eight/{id}") // 8개 메인 이미지 리뷰만 반환
    public Iterable<Review> reviewList(@PathVariable Long id,@RequestParam(required = false, defaultValue= "", value = "userId") Long userId){

        Iterable<Review> reviewList = reviewService.reviewList(id);
        if (userId != null){
            for(Review review: reviewList){
                review.setUserChecked(heartRepository.existsByUserIdAndReviewId(userId, review.getR_id()));
            }
        }
        return reviewList;
    }

    @GetMapping("/reviewlist/main/{id}")  // 본문 5개 리뷰를 반환
    public Iterable<Review> reviewListMain(@PathVariable Long id, @RequestParam(required = false, defaultValue= "0", value = "page") int pageNo,
                                           @RequestParam(required = false, defaultValue= "", value = "userId") Long userId){
        Iterable<Review> reviewList = reviewService.reviewListMain(pageNo, id);
        if (userId != null){
            for(Review review: reviewList){
                review.setUserChecked(heartRepository.existsByUserIdAndReviewId(userId, review.getR_id()));
            }
        }
        return reviewList;
    }

    @GetMapping("/reviewlist/more/{id}")  // 이미지 리뷰 더보기, 24개씩 반환
    public Iterable<Review> reviewListMore(@PathVariable Long id, @RequestParam(required = false, defaultValue= "0", value = "page") int pageNo,
                                           @RequestParam(required = false, defaultValue= "", value = "userId") Long userId){
        Iterable<Review> reviewList = reviewService.reviewListMore(pageNo, id);
        if (userId != null){
            for(Review review: reviewList){
                review.setUserChecked(heartRepository.existsByUserIdAndReviewId(userId, review.getR_id()));
            }
        }
        return reviewList;
    }

    @GetMapping("/review/reviewModal/{id}")
    public Review reviewModal(@PathVariable Long id, @RequestParam(required = false, defaultValue= "", value = "userId") Long userId){
        Review reviewEntity = reviewRepository.findById(id).get();
        if (userId != null){
            reviewEntity.setUserChecked(heartRepository.existsByUserIdAndReviewId(userId, reviewEntity.getR_id()));
        }
        return reviewEntity;
    }


}
