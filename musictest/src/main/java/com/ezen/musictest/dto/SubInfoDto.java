package com.ezen.musictest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubInfoDto {
    private int boardCount;
    private int cartCount;
    private int orderCount;
    private int replyCount;
}
