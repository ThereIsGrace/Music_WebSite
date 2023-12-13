package com.ezen.musictest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor
@NoArgsConstructor
public class OrderList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    private int totalPrice;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="orderNumber")
    private OrderNumber orderNumber;


    @ManyToOne
    @JoinColumn(name="goods")
    private Goods goods;

    @CreatedDate
    @Column(name = "regidate",nullable = false, updatable = false)
    private LocalDateTime regidate;

    @LastModifiedDate
    @Column(name = "updatedate", nullable = false)
    private LocalDateTime updatedate;

    private Boolean reviewWritten;
}
