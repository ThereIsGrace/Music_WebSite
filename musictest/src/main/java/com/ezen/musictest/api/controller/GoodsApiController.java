package com.ezen.musictest.api.controller;

import com.ezen.musictest.domain.Goods;
import com.ezen.musictest.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
public class GoodsApiController {

    @Autowired
    private GoodsService goodsService;

    @PostMapping("/api/goods/write")
    public void goodsRegister(@RequestBody Goods goods){
        goodsService.상품등록(goods);
    }

    @GetMapping("/api/goods/list")
    public List<Goods> goodsList(){
        System.out.println("상품리스트 호출");
        return goodsService.상품불러오기();
    }
}
