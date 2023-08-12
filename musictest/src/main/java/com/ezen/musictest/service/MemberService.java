package com.ezen.musictest.service;

import com.ezen.musictest.domain.Member;
import com.ezen.musictest.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    MemberRepository repository;
    //회원정보 조회
    public Iterable<Member> listMember(){
        return repository.findAll();
    }
    //회원정보 생성
    public void joinMember(Member member){
        repository.save(member);
    }
    //회원정보 수정
    public void updateMember(Member member){
        repository.save(member);
    }
    //회원정보 삭제
    public void deleteMember(String id){
        repository.deleteById(id);
    }
}
