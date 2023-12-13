package com.ezen.musictest.service;

import com.ezen.musictest.domain.Board;
import com.ezen.musictest.domain.Goods;
import com.ezen.musictest.dto.FilterRequestDto;
import com.ezen.musictest.repository.GoodsRepository;
import com.ezen.musictest.repository.GoodsSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class GoodsService {

    private final int PAGE_SIZE = 16;
    @Autowired
    private GoodsRepository goodsRepository;

    // 상품 등록
    public Goods 상품등록(Goods goods) { return goodsRepository.save(goods);}

    public List<Goods> 상품불러오기(){
        return goodsRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Page<Goods> getGoodsList(int pageNo, String criteria) {
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE, Sort.by(Sort.Direction.DESC, criteria));
        Page<Goods> pageList = goodsRepository.getAllGoods(pageable);
        return pageList;
    }

    @Transactional(readOnly = true)
    public Page<Goods> getGoodsListByFilter(int pageNo,
                                            FilterRequestDto filterRequestDto){
        String criteria = "";
        if(filterRequestDto.getCriteria().equals("판매순")){
            criteria = "sales";
        }else {
            criteria = "regDate";
        }
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE, Sort.by(Sort.Direction.DESC, criteria));
        System.out.println(pageable + "이거 먼데");
        Specification<Goods> specification = (root, query, criteriaBuilder) -> null;
        if (filterRequestDto.getType() != null) {
//            goodsRepository.findByType(filterRequestDto.getType());  // 이걸 굳이 왜 하지? 의문이다.
            specification = specification.and(GoodsSpecification.equalType((filterRequestDto.getType())));
        }
        if (filterRequestDto.getPriceLevel() != null) {
            List<Integer> priceList = new ArrayList<>();
            for (String s : filterRequestDto.getPriceLevel().split(",")) {
                priceList.add(Integer.valueOf(s));
            }
            specification = specification.and(GoodsSpecification.betweenPrice(priceList));
        }
        System.out.println("1111" + filterRequestDto.getCriteria());

        Page<Goods> goodsPage = goodsRepository.findAll(specification, pageable);
        return goodsPage;
    }

    @Transactional(readOnly = true)
    public Goods getGoodsDetail(Long goodsNo){
        return goodsRepository.findByGoodsNo(goodsNo);
    }

    @Transactional(readOnly = true)
    public List<Goods> getBestGoods(){
        return goodsRepository.getBestGoods();
    }
}
