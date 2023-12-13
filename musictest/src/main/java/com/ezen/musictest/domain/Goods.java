package com.ezen.musictest.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@DynamicInsert
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Goods {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goodsNo;

    private String type;

    @Column(length = 100)
    private String pname;

    private String description;

    @Column(length = 10)
    private int price;

    @Column(length = 10)
    private int quantity;

    private int sales;  // 판매량

    @CreationTimestamp
    private LocalDateTime regDate;

    @UpdateTimestamp
    private LocalDateTime updateDate;

    @Column(length = 1000)
    private String imageUrl;

    @Column(length = 1000)
    private String subImageUrl;

    @JsonIgnore
    @OneToMany(mappedBy = "goods")
    private List<Review> reviewList;

    private float count;

    private int reviewNumber;

    @Override
    public String toString() {
        return "Goods{" +
                "goodsNo=" + goodsNo +
                ", type='" + type + '\'' +
                ", pname='" + pname + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", sales=" + sales +
                ", regDate=" + regDate +
                ", updateDate=" + updateDate +
                ", imageUrl='" + imageUrl + '\'' +
                ", subImageUrl='" + subImageUrl + '\'' +
                '}';
    }
}
