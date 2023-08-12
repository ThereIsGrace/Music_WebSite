//package com.ezen.musictest.controller;
//
//import com.ezen.music.domain.Board;
//import com.ezen.music.service.BoardService;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
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