package com.ezen.musictest.api.controller;

import com.ezen.musictest.domain.Goods;
import com.ezen.musictest.dto.TestDto;
import com.ezen.musictest.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.ui.Model;
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

    @GetMapping("/api/goods/home")
    public TestDto goodsHome(Model model, @PageableDefault(size = 3) Pageable pageable){
        System.out.println("상품 메인 호출");
        Page<Goods> pages = goodsService.상품홈(pageable);
        int nowPage = pages.getPageable().getPageNumber() + 1;
        int startPage = Math.max(nowPage, 1);
        int endPage = Math.min(nowPage+9, pages.getTotalPages());

        TestDto testDto = TestDto.builder().pageNum(nowPage).goods(pages).build();

        System.out.println("nowPages" + nowPage);
        System.out.println("startPage" + startPage);
        System.out.println("endPage" + endPage);
        return testDto;

    }
}
