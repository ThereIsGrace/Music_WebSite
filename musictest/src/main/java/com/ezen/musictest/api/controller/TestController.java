package com.ezen.musictest.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/abc")
    public String test(){
        System.out.println("실행됐어");
        return "/";
    }
}
