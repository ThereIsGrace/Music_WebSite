package com.ezen.musictest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Data
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="user")
    private User user;

    @CreatedDate
    @Column(name = "regidate", updatable = false)
    private LocalDateTime regidate;

    @LastModifiedDate
    @Column(name = "updatedate")
    private LocalDateTime updatedate;

    @ManyToOne
    @JoinColumn(name="goods")
    private Goods goods;

    private Integer quantity;
}
