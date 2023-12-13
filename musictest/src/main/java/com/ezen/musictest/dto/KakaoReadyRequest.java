package com.ezen.musictest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KakaoReadyRequest {
    private String pname;
    private String price;
    private String quantity;
    private String itemCode;
    private String partner_user_id;
}
