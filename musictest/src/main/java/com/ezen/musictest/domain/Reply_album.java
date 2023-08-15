package com.ezen.musictest.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Reply_album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ra_id;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name="writer")
    private User user;

    @CreatedDate
    @Column(name = "regidate", updatable = false)
    private LocalDateTime regidate;

    @LastModifiedDate
    @Column(name = "updatedate")
    private LocalDateTime updatedate;

    private int album_id;
}
