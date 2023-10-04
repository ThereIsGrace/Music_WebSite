package com.ezen.musictest.domain;


import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@DynamicInsert
@Entity
@Data
public class Goods {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goodsNo;


    @Column(length = 100)
    private String pname;

    @Column(length = 10)
    private int price;

    @Column(length = 10)
    private int quantity;

    @CreationTimestamp
    private LocalDateTime regDate;

    @UpdateTimestamp
    private LocalDateTime updateDate;

    private String content;

    @Column(name="imageUrl", length = 200)
    private String imageUrl;

}
