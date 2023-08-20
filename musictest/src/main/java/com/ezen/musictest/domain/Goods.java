package com.ezen.musictest.domain;


import lombok.Data;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;

@DynamicInsert
@Entity
@Data
public class Goods {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goodsNo;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false, length = 100)
    private String pname;

    @Column(nullable = false, length = 10)
    private int sellPrice;

    @Column()
    private Date regDate;

    @Column()
    private Date updateDate;

    private String content;

    @Column(length = 200)
    private String imagepath;


}
