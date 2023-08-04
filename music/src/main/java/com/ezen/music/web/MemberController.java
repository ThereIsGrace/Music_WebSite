package com.ezen.music.web;

import com.ezen.music.domain.Member;
import com.ezen.music.domain.MemberRepository;

import com.ezen.music.service.MemberService;
import org.hibernate.Transaction;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/member/api")
public class MemberController {

    @Autowired
    private MemberService service;

    @GetMapping("find")
    public Iterable<Member> getAllMember(){
        return service.listMember();
    }

    @PostMapping("create")
    public void joinMember(Member member){
        service.joinMember(member);
    }

    @PutMapping("modify")
    @Transactional
    public void modifyMember(Member requestMember){

    }

    @DeleteMapping("/delete")
    public void deleteMember(Member requestMember){
        service.deleteMember(requestMember.getId());
    }
}
