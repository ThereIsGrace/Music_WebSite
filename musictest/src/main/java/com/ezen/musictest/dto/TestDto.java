package com.ezen.musictest.dto;

import com.ezen.musictest.domain.Goods;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;

@Builder
@Data
public class TestDto {
    private int pageNum;
    private Page<Goods> goods;
}
