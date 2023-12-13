package com.ezen.musictest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CMRespDto<T> {
    private int code;   // 1(성공), -1(실패)
    private String message;
    private T data;
}
