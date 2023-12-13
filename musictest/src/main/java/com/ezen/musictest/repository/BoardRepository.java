package com.ezen.musictest.repository;

import com.ezen.musictest.domain.Board;
import com.ezen.musictest.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findAll(Pageable pageable);

    Page<Board> findAllByUser(User user, Pageable pageable);

    @Query(value="select * from board where b_id =:b_id", nativeQuery = true)
    Board findByBid(@Param("b_id") Long id);

    Board save(Board board);

    @Query(value = "select count(*) from board where user_id =:user", nativeQuery = true)
    public int countBoardByUser(User user);
}
