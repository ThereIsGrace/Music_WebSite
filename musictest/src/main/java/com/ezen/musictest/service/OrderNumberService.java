package com.ezen.musictest.service;

import com.ezen.musictest.domain.OrderNumber;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.repository.OrderNumberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderNumberService {
    @Autowired
    private OrderNumberRepository orderNumberRepository;

    final int PAGE_SIZE = 2;
    public OrderNumber makeAndReturn(OrderNumber orderNumber){
        return orderNumberRepository.save(orderNumber);
    }

    public Page<OrderNumber> getOrderNumbers(User user, int pageNo){

        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE, Sort.by(Sort.Direction.DESC, "id"));
        return orderNumberRepository.findAllByUser(user, pageable);
    }
}
