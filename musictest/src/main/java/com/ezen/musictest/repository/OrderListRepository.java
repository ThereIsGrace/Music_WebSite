package com.ezen.musictest.repository;

import com.ezen.musictest.domain.OrderList;
import com.ezen.musictest.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderListRepository extends JpaRepository<OrderList, Long> {



}
