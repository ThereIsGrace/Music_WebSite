package com.ezen.musictest.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtTokenResponseDto {
    private String accessToken;
}
