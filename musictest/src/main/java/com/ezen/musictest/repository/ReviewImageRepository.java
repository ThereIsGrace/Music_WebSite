package com.ezen.musictest.repository;

import com.ezen.musictest.domain.ReviewImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewImageRepository extends JpaRepository<ReviewImages, Long> {
}
