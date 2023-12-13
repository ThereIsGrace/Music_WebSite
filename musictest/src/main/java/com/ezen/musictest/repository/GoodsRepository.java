package com.ezen.musictest.repository;

import com.ezen.musictest.domain.Board;
import com.ezen.musictest.domain.Goods;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface GoodsRepository extends JpaRepository<Goods, Long>, JpaSpecificationExecutor<Goods> {
    @Query(value="SELECT * FROM goods", nativeQuery = true)
    Page<Goods> getAllGoods(Pageable pageable);

    Goods findByGoodsNo(Long goodsNo);

    Goods save(Goods goods);

    @Query(value = "SELECT * FROM goods order by sales desc limit 10", nativeQuery = true)
    List<Goods> getBestGoods();
}
