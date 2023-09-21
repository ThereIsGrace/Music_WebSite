package com.ezen.musictest.repository;

import com.ezen.musictest.domain.Board;
import com.ezen.musictest.domain.Goods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface GoodsRepository extends JpaRepository<Goods, Long> {



}