package com.ezen.musictest.controller;


import com.ezen.musictest.domain.Goods;
import com.ezen.musictest.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/test/*")
public class GoodsTestConroller {

    @Autowired
    private GoodsService goodsService;

    @GetMapping("/index.do")
    public String list(Model model){
        model.addAttribute("list", goodsService.getGoodsList());
        return "goods/index";
    }
}
