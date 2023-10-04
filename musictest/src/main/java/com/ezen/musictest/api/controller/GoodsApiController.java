package com.ezen.musictest.api.controller;

import com.ezen.musictest.domain.Goods;
import com.ezen.musictest.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
public class GoodsApiController {

    @Autowired
    private GoodsService goodsService;

    @PostMapping("/api/goods/write")
    public void goodsRegister(@RequestBody Goods goods){
        System.out.println("dddd?");
        System.out.println(goods.getImageUrl());
        goodsService.상품등록(goods);
    }
}
