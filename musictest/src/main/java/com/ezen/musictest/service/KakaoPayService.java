package com.ezen.musictest.service;

import com.ezen.musictest.customRestTemplate.SecureRestTemplate;
import com.ezen.musictest.dto.KakaoApproveResponse;
import com.ezen.musictest.dto.KakaoCancelResponse;
import com.ezen.musictest.dto.KakaoReadyRequest;
import com.ezen.musictest.dto.KakaoReadyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class KakaoPayService {

    static final String cid = "TC0ONETIME";  // 가맹점 테스트 코드(카카오페이에서 제공)
    static final String admin_Key = "aff8a80950a445a5d0f32f2c6bd23dbc";  // 공개 조심! 본인 애플리케이션의 어드민 키를 넣는다.
    private KakaoReadyResponse kakaoReady;


    public KakaoReadyResponse kakaoPayReady(KakaoReadyRequest readyRequest){

        // 카카오페이 요청 양식
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>() ;
        parameters.add("cid", cid);
        parameters.add("partner_order_id", "가맹점 주문 번호");     // 가맹점 주문 번호
        parameters.add("partner_user_id", "가맹점 회원 ID");        // 가맹점 회원 ID
        parameters.add("item_name", readyRequest.getPname());
        parameters.add("quantity", readyRequest.getQuantity());
        parameters.add("total_amount", readyRequest.getPrice());
        parameters.add("item_code", readyRequest.getItemCode());
        parameters.add("vat_amount", "0");                       // 부가세
        parameters.add("tax_free_amount", "0");             // 상품 비과세 금액
        parameters.add("approval_url", "https://localhost:8094/payment/success"); // 성공 시 redirect url
        parameters.add("cancel_url", "https://localhost:8094/payment/cancel"); // 취소 시 redirect url
        parameters.add("fail_url", "https://localhost:8094/payment/fail");  // 실패 시 redirect url

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        SecureRestTemplate secureRestTemplate = new SecureRestTemplate();

        kakaoReady = secureRestTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/ready",
                requestEntity,
                KakaoReadyResponse.class);
        System.out.println("kakaoReady" + kakaoReady);
        return kakaoReady;
    }

    // 카카오 요구 헤더값
    private HttpHeaders getHeaders(){
        HttpHeaders httpHeaders = new HttpHeaders();

        String auth = "KakaoAK " + admin_Key;

        httpHeaders.set("Authorization", auth);
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return httpHeaders;
    }

    // 결제 완료 승인
    public KakaoApproveResponse approveResponse(String pgToken){

        // 카카오 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", kakaoReady.getTid());
        parameters.add("partner_order_id", "가맹점 주문 번호");
        parameters.add("partner_user_id", "가맹점 회원 ID");
        parameters.add("pg_token", pgToken);

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        SecureRestTemplate secureRestTemplate = new SecureRestTemplate();

        KakaoApproveResponse kakaoApproveResponse = secureRestTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/approve",
                requestEntity,
                KakaoApproveResponse.class
        );

        return kakaoApproveResponse;
    }

    // 결제 환불
    public KakaoCancelResponse kakaoCancel(){

        // 카카오페이 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", "환불할 결제 고유 번호");
        parameters.add("cancel_amount", "환불 금액");
        parameters.add("cancel_tax_free_amount", "환불 비과세 금액");
        parameters.add("cancel_vat_amount", "환불 부가세");

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        SecureRestTemplate secureRestTemplate = new SecureRestTemplate();

        KakaoCancelResponse cancelResponse = secureRestTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/cancel",
                requestEntity,
                KakaoCancelResponse.class
        );

        return cancelResponse;

    }
}
