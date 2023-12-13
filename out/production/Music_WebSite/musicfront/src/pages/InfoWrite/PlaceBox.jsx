import styled from "styled-components";
import {Button} from "@/components/Button/Button";
import {useRecoilValue} from "recoil";
import {useNavigate} from "react-router-dom";

import { useEffect, useState } from "react";

import { SERVER_URL } from "@/constants";
import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { infoContentAtom, infoTitleAtom } from "./infoAtoms";
import { InfoModal } from "@/components/Modal/InfoModal";

export function PlaceBox() {
  const navigate = useNavigate(); //변수 할당시켜서 사용

  const onClickBtn = () => {
    if (window.confirm("게시글작성을 취소하시겠습니까? 작성하신 게시물은 저장되지 않습니다.")) {
      navigate(-1);
    }
  };


  const title = useRecoilValue(infoTitleAtom);
  const content = useRecoilValue(infoContentAtom);
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const onSubmit = async (e) => {
    console.log('title', title);
    console.log('content', content);
    handlePostSubmit();
  };

  useEffect(()=>{},[modalOpen]);

  function handlePostSubmit(){
    try {
      const uploadData = {
        content: content,
        title: title
      };
  
      console.log("데이터베이스에 업로드할 데이터: ", uploadData);
      console.log("보내볼게");
      axiosInstance.post(SERVER_URL + 'admin/info', uploadData)
      .then(res => {
        console.log('성공');
        showModal();  
      })
      .catch(error => {
        console.log('error', error)
      })
      //moveToAnotherPage("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } 

  return (
    <SubmitProcessStyle>
      {modalOpen && <InfoModal setModalOpen={setModalOpen} />}
      <div className="UploadBtnBox">
        <Button className="CancleBtn" onClick={onClickBtn}>
          취소
        </Button>
        <Button className="SubmitBtn" onClick={onSubmit}>
          등록
        </Button>
      </div>
    </SubmitProcessStyle>
  );
}

const SubmitProcessStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  

  & .PlaceSearchInputBox {
    position: relative;
  }

  & .PlaceSearchInputBox Input {
    width: 528px;
    height: 40px;
    border: 0;
    border-bottom: 2px solid #a5b2a6;
    color: #393a40;
    padding-left: 12px;
    font-size: 14px;
    font-weight: 600;
  }

  & .PlaceSearchInputBox Button {
    border: 0;
    background-color: #fff;
    color: #6c816d;
    width: 100px;
    position: absolute;
    right: 0px;
    top: 10px;
  }

  & .PlaceSearchInputBox Button .RightArrow {
    fill: #6c816d;
    width: 14px;
    height: 14px;
    vertical-align: middle;
    margin-left: 4px;
  }

  & .UploadBtnBox Button {
    width: 120px;
    height: 40px;
    border-radius: 12px;
    border: 0;
    margin-left: 18px;
    color: #fff;
  }

  & .UploadBtnBox .CancleBtn {
    background-color: #eca997;

    &:hover {
      background-color: #f8e1db;
    }
  }

  & .UploadBtnBox .SubmitBtn {
    background-color: #6c816d;

    &:hover {
      background-color: #a5b2a6;
    }
  }
`;
