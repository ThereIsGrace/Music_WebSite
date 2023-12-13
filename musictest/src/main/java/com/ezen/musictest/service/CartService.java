package com.ezen.musictest.service;

import com.ezen.musictest.domain.Cart;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    final int PAGE_SIZE = 5;

    public Cart 저장하기(Cart cart){
        Cart cartEntity = cartRepository.save(cart);
        return cartEntity;
    }

    public Page<Cart> 카트리스트(User user, int pageNo){
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE, Sort.by(Sort.Direction.DESC, "regidate"));
        return cartRepository.findAllByUser(user, pageable);
    };

    public Cart 카트찾기(Long cartId){
        return cartRepository.findById(cartId).get();
    }

    public void 카트없애기(Iterable<Cart> cartList){
        cartRepository.deleteAll(cartList);
    }
}
