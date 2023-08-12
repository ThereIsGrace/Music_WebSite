//package com.ezen.musictest.controller;
//
//import com.ezen.musictest.domain.Board;
//import com.ezen.musictest.service.BoardService;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.PatchMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController("/board")
//@Log4j2
//public class BoardController {
//
//    @Autowired
//    private BoardService service;
//
//    @PostMapping("/write.do")
//    public void write(Board board){
//        log.info("----- write(arg) called");
//        service.regBoard(board);
//    }
//
//    @PatchMapping("/edit")
//    public void edit(Board board){
//        log.info("----- edit(arg) called");
//        service.editBoard(board);
//    }
//
//    @DeleteMapping("/delete")
//    public void deleting(Long id){
//        log.info("----- deleting(arg) called");
//        service.deleteBoard(id);
//    }
//}
