package com.ezen.musictest.controller;

import com.ezen.musictest.domain.*;
import com.ezen.musictest.dto.*;
import com.ezen.musictest.error.BusinessLogicException;
import com.ezen.musictest.error.ExceptionCode;
import com.ezen.musictest.repository.OrderListRepository;
import com.ezen.musictest.repository.UserRepository;
import com.ezen.musictest.service.CartService;
import com.ezen.musictest.service.KakaoPayService;
import com.ezen.musictest.service.OrderNumberService;
import com.ezen.musictest.service.UserService;
import jdk.swing.interop.SwingInterOpUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class KakaoPayController{

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderNumberService orderNumberService;

    @Autowired
    private OrderListRepository orderListRepository;

    private final KakaoPayService kakaoPayService;


    // 결제 요청
    @PostMapping("/ready")
    public CMRespDto<Object> readyToKakaoPay(@RequestBody PaymentCartRequestDto paymentCartRequestDto, HttpServletResponse response){
        System.out.println("request 들어왔다" +  paymentCartRequestDto);
        List<String> test = paymentCartRequestDto.getCartNumberList();
        System.out.println("사용자 나와야 함" + paymentCartRequestDto.getUserId());
        String itemCode = "";
        for(String s: test){
            itemCode += (s + "&");
        }
        itemCode = itemCode.substring(0, itemCode.length()-1);
        KakaoReadyRequest kakaoReadyRequest = KakaoReadyRequest.builder().itemCode(itemCode).pname(paymentCartRequestDto.getName())
                .price(paymentCartRequestDto.getTotalPrice()).quantity("1").partner_user_id(paymentCartRequestDto.getUserId()).build();

        KakaoReadyResponse readyResponse = kakaoPayService.kakaoPayReady(kakaoReadyRequest);

        return CMRespDto.builder().message("결제 리디렉트 페이지로 이동합니다.").code(1).data(readyResponse.getNext_redirect_pc_url()).build();
    }

    // 결제 성공
    @GetMapping("/success")
    public void afterPayRequest(@RequestParam("pg_token") String pgToken, HttpServletRequest request, HttpServletResponse response, @AuthenticationPrincipal String username){

        KakaoApproveResponse kakaoApprove = kakaoPayService.approveResponse(pgToken);
        System.out.println(kakaoApprove);
        String[] cartIdArray = kakaoApprove.getItem_code().split("&");

        List<OrderList> orderListEntities = putOrderList(cartIdArray, kakaoApprove.getPartner_user_id());
        System.out.println(orderListEntities);
        try {
            response.sendRedirect("https://localhost:3000/orderList");
        }catch(Exception e){

        }

    }

    // 결제 진행 중 취소
    @GetMapping("/cancel")
    public void cancel(HttpServletResponse response) throws BusinessLogicException {
        try {
            response.sendRedirect("https://localhost:3000/cart");
        }catch(Exception e){

        }
        //throw new BusinessLogicException(ExceptionCode.PAY_CANCEL);
    }

    // 결제 진행 중 실패
    @GetMapping("/fail")
    public void fail() throws BusinessLogicException{
        throw new BusinessLogicException(ExceptionCode.PAY_FAILED);
    }

    // 환불
    @PostMapping("/refund")
    public ResponseEntity refund(){

        KakaoCancelResponse kakaoCancelResponse = kakaoPayService.kakaoCancel();

        return new ResponseEntity<>(kakaoCancelResponse, HttpStatus.OK);
    }

    public List<OrderList> putOrderList(String[] numberList, String userId){
        String uuid = UUID.randomUUID().toString();
        List<OrderList> orderLists = new ArrayList<>();
        List<Cart> cartLists = new ArrayList<>();
        Cart cart = cartService.카트찾기(Long.valueOf(numberList[0]));
        User user = cart.getUser();
        OrderNumber orderNumber = OrderNumber.builder().user(user).orderNumber(UUID.randomUUID().toString()).build();
        OrderNumber orderNumber1 = orderNumberService.makeAndReturn(orderNumber);
        for (String number: numberList){
            Cart cart2 = cartService.카트찾기(Long.valueOf(number));
            Goods goods = cart.getGoods();
            int goodsQuantity = goods.getQuantity();
            goods.setQuantity(goodsQuantity - cart2.getQuantity());
            goods.setSales(cart2.getQuantity());
            cartLists.add(cart2);

            OrderList order = OrderList.builder()
                    .goods(cart2.getGoods())
                    .quantity(cart2.getQuantity())
                    .totalPrice(cart2.getQuantity() * goods.getPrice())
                    .orderNumber(orderNumber1)
                    .reviewWritten(false)
                    .build();
            orderLists.add(order);
        }
        cartService.카트없애기(cartLists);
        return orderListRepository.saveAll(orderLists);
    }
}
