package com.ezen.musictest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Data
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long r_id;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="goods")
    private Goods goods;

    private int count;

    @CreatedDate
    @Column(name = "regidate", updatable = false)
    private LocalDateTime regidate;

    @LastModifiedDate
    @Column(name = "updatedate")
    private LocalDateTime updatedate;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ReviewImages> reviewImagesList;

    @JsonIgnore
    @JoinColumn(name = "orderList")
    @OneToOne
    private OrderList orderList;

    private Boolean imageReview;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Heart> heartList;

    private int userChecked;
}
