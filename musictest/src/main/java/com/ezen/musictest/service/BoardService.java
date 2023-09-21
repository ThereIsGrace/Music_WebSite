package com.ezen.musictest.service;

import com.ezen.musictest.domain.Board;
import com.ezen.musictest.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class BoardService {

    @Autowired
    BoardRepository boardRepository;

    //게시물 리스트
    public Iterable<Board> boardList(){
        return boardRepository.findAll();
    };

    public Board boardDetail(Long id){
        return boardRepository.findById(id).get();
    }

    //게시물 생성
    @Transactional
    public Board 게시글쓰기(Board board){
        Board boardEntity = boardRepository.save(board);
        return boardEntity;
    }

    //게시물 수정
    public void editBoard(Board board){
        boardRepository.save(board);
    }

    //게시물 삭제
    public void deleteBoard(Long id){
        boardRepository.deleteById(id);
    }

}
