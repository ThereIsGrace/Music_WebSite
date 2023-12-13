package com.ezen.musictest.api.controller;

import com.ezen.musictest.service.HeartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HeartApiController {

    @Autowired
    private HeartService heartService;

    @GetMapping("/heart/add/{reviewId}")
    public void heartAdd(@PathVariable Long reviewId, @AuthenticationPrincipal String username){
        heartService.heartAdd(reviewId, username);
    }

    @GetMapping("/heart/delete/{reviewId}")
    public void heartDelete(@PathVariable Long reviewId, @AuthenticationPrincipal String username){
        heartService.heartDelete(reviewId, username);
    }
}
