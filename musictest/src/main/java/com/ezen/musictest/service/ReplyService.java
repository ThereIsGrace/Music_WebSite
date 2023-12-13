package com.ezen.musictest.service;

import com.ezen.musictest.domain.Board;
import com.ezen.musictest.domain.Reply;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.repository.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReplyService {

    @Autowired
    private ReplyRepository replyRepository;

    @Transactional
    public Reply replySave(Reply reply){
        System.out.println("댓글을 저장합니다.");
        return replyRepository.save(reply);
    }
    @Transactional
    public List<Reply> myReply(User user){
        return replyRepository.findAllByUser(user);
    }

    @Transactional
    public List<Reply> boardReply(Board board){
        return replyRepository.findAllByBoard(board);
    }
}
