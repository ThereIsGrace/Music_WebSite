package com.ezen.musictest.service;

import com.ezen.musictest.domain.OrderList;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.repository.OrderListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class OrderListService {

    @Autowired
    private OrderListRepository orderListRepository;


}
