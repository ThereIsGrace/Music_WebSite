package com.ezen.musictest.repository;

import com.ezen.musictest.domain.Board;
import com.ezen.musictest.domain.Reply;
import com.ezen.musictest.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {

    @Query(value = "select * from reply r join (select b_id from board where user_id =:user) p on" +
            " r.b_id = p.b_id order by regidate desc limit 5", nativeQuery = true)
    public List<Reply> findAllByUser(User user);

    @Query(value = "select count(*) from reply where user =:user", nativeQuery = true)
    public int countReplyByUser(User user);

    @Query(value = "select * from reply where b_id =:board order by regidate desc", nativeQuery = true)
    public List<Reply> findAllByBoard(Board board);
}
