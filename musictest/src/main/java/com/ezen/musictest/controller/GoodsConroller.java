package com.ezen.musictest.controller;


import com.ezen.musictest.domain.Goods;
import com.ezen.musictest.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/goods/*")
public class GoodsConroller {


    private String filePath = "C:/upload";


    @Autowired
    private GoodsService goodsService;


    @PostMapping("/list.do")
    public List<Goods> list(){
        return goodsService.getGoodsList();
    }

    @PostMapping("/detail.do")
    public Goods detail(Long goodsId){
        return goodsService.getGoodsinfo(goodsId);
    }


    @PostMapping("/save.do")
    public void save(Goods goods,@RequestParam("uploadFile") MultipartFile[] uploadFile){

        goodsService.saveGoods(goods);

        if(goods.getImageUrl() != null)
            fileUpload(goods,uploadFile);

    }

    @PostMapping("/remove.do")
    public void remove(Long goodsId){
        goodsService.deleteGoods(goodsId);
    }



    private String fileUpload(Goods detail, MultipartFile[] uploadFile) {
        String uploadFolder = filePath + "/site";

        System.out.println("상품 번호: ");
        String uploadFolderPath = String.format("%d", detail.getGoodsNo());

        // make folder ---------
        File uploadPath = new File(uploadFolder, uploadFolderPath); // 상품 번호로 경로를 만듦

        if (uploadPath.exists() == false) { // 해당 상품 폴더가 없으면
            uploadPath.mkdirs(); // 해당 경로에 폴더를 만든다.
        }

        for (MultipartFile multipartFile : uploadFile) {
            String uploadFileName = multipartFile.getOriginalFilename();

            // IE has file path
            uploadFileName = uploadFileName.substring(uploadFileName.lastIndexOf("\\") + 1);

            UUID uuid = UUID.randomUUID(); // 첨부파일은 randomUUID를 이용해서 임의의 값을 생성할 수 있다.

            uploadFileName = uuid.toString() + "_" + uploadFileName; // 생성된 값은 원래의 파일 이름과 구분할 수 있도록 중간에 '_'를 추가할 수 있음

            // File saveFile = new File(uploadFolder, uploadFileName);

            try {

                File saveFile = new File(uploadPath, uploadFileName); // c:upload/main/{상품 번호 폴더}/파일 이름으로 최종 경로 생성
                multipartFile.transferTo(saveFile); // 파일을 최종 경로로 이동

                detail.setImageUrl("/" + uploadFileName);

                goodsService.updateFilePath(detail);
                // 만일 이미지 타입이라면 섬네일을 생성하도록 한다.
                // check image type file
                if (checkImageType(saveFile)) {
                    // FileOutputStream :데이터를 파일에 바이트 스트림으로 저장
                    // File 클래스는 파일과 디렉터리를 다룸. 그래서 File 인스턴스는 파일일 수도 있고 디렉터리 일수도 있다.
                    // File(String parent, String child) - parent 폴더 경로의 child라는 파일에 대한 File 객체 생성
              /*      FileOutputStream thumbnail = new FileOutputStream(new File(uploadPath, "s_" + uploadFileName));
                    Thumbnailator.createThumbnail(multipartFile.getInputStream(), thumbnail, 100, 100);
                    thumbnail.close();*/
                }

            } catch (Exception e) {
                e.printStackTrace();
            } // end catch
        } // end for

        return null;
    }

    private boolean checkImageType(File file) {

        try {
            String contentType = Files.probeContentType(file.toPath());

            return contentType.startsWith("image");

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return false;
    }


}
