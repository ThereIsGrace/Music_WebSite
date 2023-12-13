package com.ezen.musictest.api.controller;

import com.ezen.musictest.domain.Board;
import com.ezen.musictest.domain.Cart;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.dto.CMRespDto;
import com.ezen.musictest.dto.CartListDto;
import com.ezen.musictest.service.CartService;
import com.ezen.musictest.service.GoodsService;
import com.ezen.musictest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CartApiController {

    @Autowired
    private CartService cartService;

    @Autowired
    private GoodsService goodsService;

    @Autowired
    private UserService userService;

    @GetMapping("/cart/add")
    public Cart cartSave(@RequestParam Long goodsNo, @RequestParam int quantity, @AuthenticationPrincipal String username){
        System.out.println("카트 포함");
        Cart cart = Cart.builder().user(userService.getUserInfo(username)).
                goods(goodsService.getGoodsDetail(goodsNo))
                .quantity(quantity)
                .build();
        return cartService.저장하기(cart);
    }

    @GetMapping("/cartlist")
    public Page<Cart> cartlist(@RequestParam(required = false, defaultValue= "0", value = "page") int pageNo, @AuthenticationPrincipal String username){
        System.out.println("장바구니 조회 시작");
        System.out.println(pageNo);
        User userEntity = userService.getUserInfo(username);
        Page<Cart> cartList = cartService.카트리스트(userEntity, pageNo);
        return cartList;
    }

    @PostMapping("/cart/delete")
    public void cartListDelete(@AuthenticationPrincipal String username, @RequestBody CartListDto cartListDto){
        System.out.println("delete 들어옴");
        System.out.println(cartListDto.getCartList());
        List<Cart> cartList = new ArrayList<>();
        for (String cartNo: cartListDto.getCartList()){
            cartList.add(cartService.카트찾기(Long.valueOf(cartNo)));
        }
        cartService.카트없애기(cartList);
    }
}
