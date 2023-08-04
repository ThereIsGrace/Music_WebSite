package com.ezen.music.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Reply_song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rs_id;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name="writer")
    private Member member;

    @CreatedDate
    @Column(name = "regidate", updatable = false)
    private LocalDateTime regidate;

    @LastModifiedDate
    @Column(name = "updatedate")
    private LocalDateTime updatedate;

    @ManyToOne
    @JoinColumn(name="song_id")
    private Song song;

}
