package com.ezen.musictest.api.controller;

import com.ezen.musictest.config.auth.PrincipalDetails;
import com.ezen.musictest.domain.Board;
import com.ezen.musictest.dto.BoardRequestDto;
import com.ezen.musictest.dto.CMRespDto;
import com.ezen.musictest.service.BoardService;
import com.ezen.musictest.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class BoardApiController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private UserService userService;
    @PostMapping("/board/write")
    public Board postBoard(@RequestBody BoardRequestDto boardRequestDto, @AuthenticationPrincipal String username){
        log.info("게시글 작성이 시작되었습니다.");
        Board board = Board.builder().title(boardRequestDto.getTitle())
                .content(boardRequestDto.getContent())
                .user(userService.getUserInfo(username))
                .hits(0)
                .build();

        Board createdBoard = boardService.게시글쓰기(board);
        log.info("게시글 작성이 완료되었습니다.");
        return boardService.getBoardDetail(createdBoard.getB_id());
    }

    @GetMapping("/board/updateTrial")
    public Board updateBoardTrial(@RequestParam long b_id){
        log.info("게시글 수정 시도가 시작되었습니다.");
        Board board = boardService.getBoardDetail(b_id);
        return board;
    }

    @PutMapping("/board/update/{b_id}")
    public Board updateBoard(@PathVariable long b_id, @RequestBody BoardRequestDto boardRequestDto, @AuthenticationPrincipal String username){
        System.out.println("게시글 수정 요청");
        log.info("게시글 수정이 시작되었습니다.");
        Board board = boardService.getBoardDetail(b_id);
        System.out.println(boardRequestDto.getContent());
        board.setTitle(boardRequestDto.getTitle());
        board.setContent(boardRequestDto.getContent());
        boardService.editBoard(board);
        log.info("수정된 게시글이 저장되었습니다.");
        return board;
    }

    @GetMapping("/boardlist")
    public ResponseEntity<CMRespDto<Iterable<Board>>> readBoard(@RequestParam(required = false, defaultValue= "0", value = "page") int pageNo,
                                 @RequestParam(required = false, defaultValue = "regidate", value = "criteria") String criteria
    ){
        System.out.println("게시글 조회 시작");
        Iterable<Board> boardList = boardService.boardList(pageNo, criteria);
        return ResponseEntity.ok().body(CMRespDto.<Iterable<Board>>builder().code(1).message("게시물의 목록을 반환했습니다.").data(boardList).build());
    }

    @GetMapping("/my/boardlist")
    public ResponseEntity<CMRespDto<Iterable<Board>>> readMyBoard(@AuthenticationPrincipal String username,
                                                                  @RequestParam(required = false, defaultValue = "0", value = "page") int pageNo,
                                                                  @RequestParam(required = false, defaultValue = "regidate", value="criteria") String criteria
                                                                  ){
        System.out.println("사용자가 게시물을 요청했습니다.");
        Iterable<Board> boardList = boardService.getMyBoard(pageNo, criteria, username);
        System.out.println(boardList);
        return ResponseEntity.ok().body(CMRespDto.<Iterable<Board>>builder().code(1).message("사용자가 쓴 게시물을 보냈습니다.").data(boardList).build());
    }

    @GetMapping("/boardlist/detail/{id}")
    public ResponseEntity<CMRespDto<Board>> readDetailBoard(@PathVariable long id){
        System.out.println("id???" + id);
        Board board = boardService.getBoardDetail(id);
        board.setHits(board.getHits() + 1);
        boardService.editBoard(board);
        System.out.println("board: " + board.getTitle());
        return ResponseEntity.ok().body(CMRespDto.<Board>builder().code(1).message("게시글을 찾았습니다.").data(board).build());
    }

    @GetMapping("/board/delete")
    public ResponseEntity deleteBoard(@RequestParam long b_id){
        System.out.println("삭제 요청이 들어왔습니다.");
        boardService.deleteBoard(b_id);
        return ResponseEntity.ok().body("삭제에 성공했습니다.");
    }
}
