package com.ezen.musictest.api.controller;

import com.ezen.musictest.domain.Info;
import com.ezen.musictest.service.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InfoController {

    @Autowired
    private InfoService infoService;

    @PostMapping("/admin/info")
    public void saveInfo(@RequestBody Info info){
        infoService.infoSave(info);
    }

    @GetMapping("/product/info")
    public List<Info> getInfoList(){
        return infoService.infoList();
    }
}
