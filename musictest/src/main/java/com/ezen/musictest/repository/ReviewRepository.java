package com.ezen.musictest.repository;

import com.ezen.musictest.domain.Goods;
import com.ezen.musictest.domain.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    public Review save(Review review);


    @Query(value = "select * from review where goods =:goods and image_review = true order by regidate desc limit 8", nativeQuery = true)
    public List<Review> findAllByGoods(Goods goods);

    @Query(value = "select * from review where goods =:goods and image_review = true order by regidate desc", nativeQuery = true)
    public Page<Review> findAllByGoods2(Goods goods, Pageable pageable);

    @Query(value = "select * from review where goods =:goods order by regidate desc", nativeQuery = true)
    public Page<Review> findAllByGoods3(Goods goods, Pageable pageable);

    @Query(value = "select round(avg(count),1) from review where goods =:goods", nativeQuery = true)
    public float getAvgCount(Goods goods);


    @Query(value = "select count(*) from review where goods =:goods", nativeQuery = true)
    public int getTotalReviewNumber(Goods goods);
}
