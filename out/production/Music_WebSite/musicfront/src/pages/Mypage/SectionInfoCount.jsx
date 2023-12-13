import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { SERVER_URL } from "@/constants";
import { useEffect, useState } from "react";
import styled from "styled-components/macro";

export function SectionInfoCount() {
  const [subInfo, setSubInfo] = useState({});
  const getSubInfo = () => {
    console.log('subInfo 실행됨');
    axiosInstance.get(SERVER_URL + 'user/subInfo')
    .then(res => setSubInfo(res.data))
    .catch(err => console.log(err));
  }

  useEffect(()=>{
    getSubInfo();
  },[]);

  useEffect(()=>{},[subInfo])

  return (
    <InfoCount>
      <div className="ListTitle">
        <span>내 정보</span>
      </div>
      <ul className="InfoCountListItem">
        <li>
          <p>구매건수</p>
          <p className="InfoCountNum">{subInfo.orderCount}</p>
        </li>
        <li>
          <p>장바구니</p>
          <p className="InfoCountNum">{subInfo.cartCount}</p>
        </li>
        <li>
          <p>게시글 수</p>
          <p className="InfoCountNum">{subInfo.boardCount}</p>
        </li>
        <li>
          <p>댓글 수</p>
          <p className="InfoCountNum">{subInfo.replyCount}</p>
        </li>
      </ul>
    </InfoCount>
  );
}

const InfoCount = styled.div`
  width: 100%;
  margin-top: 60px;

  & .ListTitle {
    border-radius: 12px 12px 0 0;
  }

  & .InfoCountListItem {
    display: flex;
    border-radius: 0 0 12px 12px;
    border: 1px solid #f8e1db;
  }

  & .InfoCountListItem li {
    width: 204px;
    height: 100px;
    border-right: 1px solid #f8e1db;
    color: #4d5159;
    padding: 24px;
  }

  & .InfoCountListItem li:nth-child(4) {
    border: 0;
  }

  & .InfoCountNum {
    color: #6c816d;
    font-weight: 600;
    font-size: 28px;
    margin-top: 8px;
  }
`;
