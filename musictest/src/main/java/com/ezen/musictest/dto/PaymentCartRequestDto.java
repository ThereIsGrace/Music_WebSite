package com.ezen.musictest.dto;

import lombok.Data;

import java.util.List;

@Data
public class PaymentCartRequestDto {
    private List<String> cartNumberList;
    private String totalPrice;
    private String name;
    private String userId;
}
