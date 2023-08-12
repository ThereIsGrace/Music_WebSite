package com.ezen.musictest.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long song_id;

    @Column(length = 100)
    private String title;

    @Column(length = 100)
    private String artist_name;

    @CreatedDate
    @Column(name = "regidate", updatable = false)
    private LocalDateTime regidate;

    @Column(length = 100)
    private String imagepath;

    private int like_num;
}
