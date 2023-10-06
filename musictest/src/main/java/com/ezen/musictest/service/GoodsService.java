package com.ezen.musictest.service;

import com.ezen.musictest.domain.Board;
import com.ezen.musictest.domain.Goods;
import com.ezen.musictest.repository.BoardRepository;
import com.ezen.musictest.repository.GoodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodsService {

    @Autowired
    private GoodsRepository goodsRepository;

    // 상품 등록
    public void 상품등록(Goods goods) {goodsRepository.save(goods);}

    public List<Goods> 상품불러오기(){
        return goodsRepository.findAll();
    }
    //게시물 리스트
    public List<Goods> getGoodsList(){
        return goodsRepository.findAll();
    };

    public Goods getGoodsinfo(Long id){
        return goodsRepository.findById(id).get();
    }

    //게시물 생성
    public void saveGoods(Goods board){
        goodsRepository.save(board);
    }

    //게시물 수정
/*
    public void editBoard(Goods board){
        goodsRepository.save(board);
    }
*/

    public void updateFilePath(Goods goods){
        goodsRepository.save(goods);
    }



    //게시물 삭제
    public void deleteGoods(Long id){
        goodsRepository.deleteById(id);
    }

}
