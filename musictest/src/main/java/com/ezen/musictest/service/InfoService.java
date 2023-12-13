package com.ezen.musictest.service;

import com.ezen.musictest.domain.Info;
import com.ezen.musictest.repository.InfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InfoService {

    @Autowired
    private InfoRepository infoRepository;

    @Transactional
    public void infoSave(Info info){
        infoRepository.save(info);
    }

    @Transactional
    public List<Info> infoList(){
        return infoRepository.findAll();
    }


}
