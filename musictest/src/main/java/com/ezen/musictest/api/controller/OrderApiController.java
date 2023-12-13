package com.ezen.musictest.api.controller;

import com.ezen.musictest.domain.OrderList;
import com.ezen.musictest.domain.OrderNumber;
import com.ezen.musictest.service.OrderListService;
import com.ezen.musictest.service.OrderNumberService;
import com.ezen.musictest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderApiController {

    @Autowired
    private OrderNumberService orderNumberService;

    @Autowired
    private UserService userService;
    @GetMapping("/order")
    public Iterable<OrderNumber> orderList(@RequestParam(required = false, defaultValue= "0", value = "page") int pageNo, @AuthenticationPrincipal String username){
        System.out.println("orderList 조회");
        Iterable<OrderNumber> orderNumbers =  orderNumberService.getOrderNumbers(userService.getUserInfo(username), pageNo);
        System.out.println(orderNumbers);
        return orderNumbers;
    }
}
