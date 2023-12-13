package com.ezen.musictest.repository;

import com.ezen.musictest.domain.OrderNumber;
import com.ezen.musictest.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderNumberRepository extends JpaRepository<OrderNumber, Long> {
    public OrderNumber save(OrderNumber orderNumber);

    public Page<OrderNumber> findAllByUser(User user, Pageable pageable);

    @Query(value = "select count(*) from order_number where user =:user", nativeQuery = true)
    public int countOrderNumberByUser(User user);
}
