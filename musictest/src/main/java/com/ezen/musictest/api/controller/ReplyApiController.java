package com.ezen.musictest.api.controller;

import com.ezen.musictest.config.auth.PrincipalDetails;
import com.ezen.musictest.domain.Board;
import com.ezen.musictest.domain.Reply;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.dto.CMRespDto;
import com.ezen.musictest.dto.ReplyRequestDto;
import com.ezen.musictest.service.BoardService;
import com.ezen.musictest.service.ReplyService;
import com.ezen.musictest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReplyApiController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private ReplyService replyService;

    @Autowired
    private UserService userService;

    @PostMapping("/reply/save")
    public ResponseEntity<CMRespDto<Reply>> replySave(@AuthenticationPrincipal String username, @RequestBody ReplyRequestDto replyRequestDto){
        System.out.println("댓글 입력 replyRequestDto 들어옴: " + replyRequestDto);
        Board board = boardService.getBoardDetail(replyRequestDto.getB_id());
        User user = userService.getUserInfo(username);
        Reply reply = Reply.builder().user(user).board(board).content(replyRequestDto.getContent()).build();
        Reply replyEntity = replyService.replySave(reply);
        return ResponseEntity.ok().body(CMRespDto.<Reply>builder().code(1).message("댓글을 저장했습니다.").data(replyEntity).build());
    }

    @GetMapping("/my/reply")
    public ResponseEntity<CMRespDto<List<Reply>>> myReply(@AuthenticationPrincipal String username){
        User user = userService.getUserInfo(username);
        List<Reply> replyList = replyService.myReply(user);
        return ResponseEntity.ok().body(CMRespDto.<List<Reply>>builder().code(1).message("댓글을 불러왔습니다.").data(replyList).build());
    }

    @GetMapping("/boardlist/reply/{id}")
    public ResponseEntity<CMRespDto<List<Reply>>> boardReply(@PathVariable Long id, @AuthenticationPrincipal String username){
        Board board = boardService.getBoardDetail(id);
        List<Reply> replyList = replyService.boardReply(board);
        return ResponseEntity.ok().body(CMRespDto.<List<Reply>>builder().code(1).message("댓글을 불러왔습니다.").data(replyList).build());
    }
}
