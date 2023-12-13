package com.ezen.musictest.api.controller;

import com.ezen.musictest.domain.Goods;
import com.ezen.musictest.dto.FilterRequestDto;
import com.ezen.musictest.dto.GoodsDto;
import com.ezen.musictest.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class GoodsApiController {

    @Autowired
    private GoodsService goodsService;


    @PostMapping("/admin/goods/write")
    public Goods goodsRegister(@RequestBody GoodsDto goodsDto){
        Goods goods = Goods.builder().pname(goodsDto.getPname()).price(goodsDto.getPrice()).description(goodsDto.getDescription()).imageUrl(goodsDto.getImageUrl()).type(goodsDto.getType())
                        .subImageUrl(goodsDto.getSubImageUrl()).quantity(goodsDto.getQuantity()).build();
        return goodsService.상품등록(goods);
    }

    @GetMapping("/product/list")
    public Iterable<Goods> goodsList(@RequestParam(required = false, defaultValue = "0", value="page") int pageNo,
                                 @RequestParam(required = false, defaultValue = "reg_date", value="criteria") String criteria){
        System.out.println("상품리스트 호출" + pageNo);
        return goodsService.getGoodsList(pageNo, criteria);
    }

    @GetMapping("/product/detail/{id}")
    public Goods goodsDetail(@PathVariable Long id){
        System.out.println("상품 상세페이지 호출 상품 번호 : " + id);
        Goods goods = goodsService.getGoodsDetail(id);
        return goods;
    }

    @PostMapping("/product/findFilter")
    public Iterable<Goods> goodsListByCriteria(@RequestParam(required = false, defaultValue = "0", value="page") int pageNo,
                                               @RequestBody(required = false)FilterRequestDto filterRequestDto){
        System.out.println("pageNum: " + pageNo);
        return goodsService.getGoodsListByFilter(pageNo, filterRequestDto);
    }

    @GetMapping("/product/best")
    public Iterable<Goods> goodsBest(){
        return goodsService.getBestGoods();
    }
}
