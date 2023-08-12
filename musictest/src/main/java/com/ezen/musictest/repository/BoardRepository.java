package com.ezen.musictest.repository;

import com.ezen.musictest.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByContentContaining(@Param("content")String content);

    List<Board> findByWriterContaining(@Param("writer")String writer);
}
