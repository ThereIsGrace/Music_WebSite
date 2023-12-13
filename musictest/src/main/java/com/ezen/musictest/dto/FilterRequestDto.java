package com.ezen.musictest.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class FilterRequestDto {
    private String type;
    private String priceLevel;
    private String criteria;
}
