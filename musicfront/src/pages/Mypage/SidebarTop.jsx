import {SidebarBottom} from "@/pages/Mypage/SidebarBottom";
import {db} from "@/firebase/app";
import {doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {uidAtom} from "../Register/atoms/uidAtom";
import {useRecoilState} from "recoil";
import styled from "styled-components/macro";

export function SidebarTop(props) {
  const user = props.user;
  const [uid, setUid] = useRecoilState(uidAtom);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImageURL, setProfileImageURL] = useState("");
  const [docSnap, setDocSnap] = useState(null);
  console.log(user + 'user');
  console.log('2222222');
  console.log(user.name);
  console.log('3333333');
  console.log('profileImage', user.profileImage);

  return (
    <MypageSide>
      <div className="profile">
        <img src={user.profileImage} alt="프로필 이미지"></img>
        <p className="profileName">{user.name}</p>
        <p className="profileNum">{user.email}</p>
      </div>
      <SidebarBottom></SidebarBottom>
    </MypageSide>
  );
}

const MypageSide = styled.div`
  position: sticky;
  top: 80px;
  width: 216px;
  height: 560px;

  & .profile {
    height: 220px;
    border: 1px solid rgb(85, 85, 85);
    background-color: #fff;
    border-radius: 12px 12px 0 0;
    text-align: center;
    padding-top: 24px;
  }

  & .profile img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }

  & .profile .profileName {
    margin-top: 16px;
    color: rgb(85, 85, 85);
    font-size: 16px;
    font-weight: 600;
  }

  & .profile .profileNum {
    margin-top: 8px;
    color: #868b94;
    font-size: 14px;
  }
`;
