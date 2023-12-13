package com.ezen.musictest.dto;

import lombok.Data;

@Data
public class GoodsDto {
    private String type;
    private String imageUrl;
    private String subImageUrl;
    private int price;
    private String pname;
    private int quantity;
    private String description;
}
