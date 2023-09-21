package com.ezen.musictest.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BoardRequestDto {
    private String description;
    private String imgUrl;
    private String location;
    private String title;
    private String userId;
}
