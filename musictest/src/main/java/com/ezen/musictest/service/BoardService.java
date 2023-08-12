package com.ezen.musictest.service;

import com.ezen.musictest.domain.Board;
import com.ezen.musictest.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardService {

    @Autowired
    BoardRepository repository;

    //게시물 리스트
    public Iterable<Board> boardList(){
        return repository.findAll();
    };

    public Board boardDetail(Long id){
        return repository.findById(id).get();
    }

    //게시물 생성
    public void regBoard(Board board){
        repository.save(board);
    }

    //게시물 수정
    public void editBoard(Board board){
        repository.save(board);
    }

    //게시물 삭제
    public void deleteBoard(Long id){
        repository.deleteById(id);
    }

}
