package com.ezen.musictest.api.controller;

import com.ezen.musictest.domain.Board;
import com.ezen.musictest.dto.BoardRequestDto;
import com.ezen.musictest.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardApiController {

    @Autowired
    private BoardService boardService;
    @PostMapping("/api/board/write")
    public void postBoard(@RequestBody BoardRequestDto boardRequestDto){
        System.out.println("aaa:" + boardRequestDto.getImgUrl());
        Board board = Board.builder()
                        .title(boardRequestDto.getTitle())
                                .content(boardRequestDto.getDescription())
                .image_url(boardRequestDto.getImgUrl())
                                                .build();
        Board boardEntity = boardService.게시글쓰기(board);
        System.out.println("boardEntity" + boardEntity.toString());
    }
}
