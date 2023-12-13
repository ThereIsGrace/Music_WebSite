package com.ezen.musictest.service;

import com.ezen.musictest.domain.Board;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.repository.BoardRepository;
import com.ezen.musictest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class BoardService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    UserRepository userRepository;

    final int PAGE_SIZE = 10;

    //전체 게시물 조회
    @Transactional(readOnly = true)
    public Iterable<Board> boardList(int pageNo, String criteria){

        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE, Sort.by(Sort.Direction.DESC, criteria));
        return boardRepository.findAll(pageable);
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
    @Transactional
    public void editBoard(Board board){
        boardRepository.save(board);
    }

    //게시물 삭제
    public void deleteBoard(Long id){
        boardRepository.deleteById(id);
    }

    //내가 쓴 게시물 조회
    @Transactional(readOnly = true)
    public Iterable<Board> getMyBoard(int pageNo, String criteria, String username){

        Pageable pageable = PageRequest.of(pageNo, 7, Sort.by(Sort.Direction.DESC, criteria));
        User user = userRepository.findByUsername(username);
        Page<Board> myBoardList = boardRepository.findAllByUser(user, pageable);
        return myBoardList;
    }

    //게시물 상세 조회
    @Transactional(readOnly = true)
    public Board getBoardDetail(long id){
        return boardRepository.findByBid(id);
    }

}
