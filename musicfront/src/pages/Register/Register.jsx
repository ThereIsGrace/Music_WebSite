import { useRecoilValue, useRecoilState, useRecoilCallback } from "recoil";
import { emailAtom, passwordAtom, passwordConfirmAtom, nameAtom, mobileAtom, birthdayAtom, profileImageAtom, profileImageURLAtom, currentUserAtom, idAtom } from './atoms/inputValueAtoms';
import { emailVisibleAtom, passwordVisibleAtom, passwordConfirmVisibleAtom, nameVisibleAtom, mobileVisibleAtom, idVisibleAtom, modalAtom, modalTextAtom } from './atoms/checkInputValueAtom';
import { checkedTermsAtom, checkedAgeAtom } from './atoms/termsAtoms';
import { uidAtom } from './atoms/uidAtom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { auth, db } from "@/firebase/app";
import { setDoc, doc } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
import { RegisterForm, RegisterTerms, RegisterModal } from '@/pages/Register'
import { Header, Footer, Heading2, Button } from '@/components'
import { useState } from 'react';
import axios from "axios";
import { SERVER_URL } from "@/constants";
import {storage} from "./../../firebase/app";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";  
import { Store } from './../Home/Store';


export function Register() {

  const [email, setEmail] = useRecoilState(emailAtom);
  const [emailVisible, setEmailVisible] = useRecoilState(emailVisibleAtom);
  const [username, setUsername] = useRecoilState(idAtom);
  const [idVisible, setIdvisible] = useRecoilState(idVisibleAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [passwordVisible, setPasswordVisible] = useRecoilState(passwordVisibleAtom);
  const [passwordConfirm, setPasswordConfirm] = useRecoilState(passwordConfirmAtom);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useRecoilState(passwordConfirmVisibleAtom);
  const [name, setName] = useRecoilState(nameAtom);
  const [nameVisible, setNameVisible] = useRecoilState(nameVisibleAtom);
  const [mobile, setMobileAtom] = useRecoilState(mobileAtom);
  const [mobileVisible, setMobileVisibleAtom] = useRecoilState(mobileVisibleAtom);
  const [profileImageURL, setProfileImageURL] = useRecoilState(profileImageURLAtom);
  const [profileImage, setProfileImage] = useRecoilState(profileImageAtom);
  const [birthday, setBirthday] = useRecoilState(birthdayAtom);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  
  const checkedTerms = useRecoilValue(checkedTermsAtom);

  const [vaildReg, setVaildReg] = useState(false);

  const navigate = useNavigate();

  const [modal, setModal] = useRecoilState(modalAtom);
  const [modalText, setModalText] = useRecoilState(modalTextAtom);

  async function handleCheckRegister() {
    switch (true) {
      case email === "" || emailVisible === true:
        setModal(true);
        setModalText("이메일을 확인해주세요");
        return;
      case username === "" || idVisible === true:
        setModal(true);
        setModalText("아이디를 확인해주세요");
        return;
      case password === "" || passwordVisible === true:
        setModal(true);
        setModalText("비밀번호를 확인해주세요");
        return;
      case passwordConfirm === "" || passwordConfirmVisible === true:
        setModal(true);
        setModalText("비밀번호 중복을 확인해주세요");
        return;
      case name === "" || nameVisible === true:
        setModal(true);
        setModalText("이름을 확인해주세요");
        return;
      case mobile === "" || mobileVisible === true:
        setModal(true);
        setModalText("휴대폰 번호를 확인해주세요");
        return;
      case birthday === "":
        setModal(true);
        setModalText("생년월일을 입력해주세요");
        return;
      case !profileImage.name:
        setModal(true);
        setModalText("프로필 이미지를 넣어주세요");
        return;
      case checkedTerms === false:
        setModal(true);
        setModalText("이용약관 및 동의사항을 확인해주세요");
        return;
      default:
        console.log(email);
        setVaildReg(!vaildReg);
        setModal(false);
        await registerUser();
        setVaildReg(!vaildReg);
        break;
    }
  }

  async function registerUser() {

    let body = {
      username: username,
      password: password,
      email: email,
      mobile: mobile,
      name: name
    }
    
    try {
      addUserCollection(body)
    } catch(error) {
      console.log(error.message);
    }
  }

  async function addUserCollection(body) {
    const formData = new FormData();
    try{
      const storageRef = ref(
        storage,
        `profile/${Date.now()}`+profileImage.name
      );
      await uploadBytes(storageRef, profileImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          formData.append('name', name);
          formData.append('username', username);
          formData.append('year', birthday);
          console.log('bbbbb'+birthday);
          formData.append('email', email);
          formData.append('mobile', mobile);
          formData.append('password', password);
          formData.append('profileImage', url);
          setProfileImageURL(url);
          console.log(formData);

          axios.post(SERVER_URL + 'register', formData, {
            'Content-Type': 'multipart/form-data'
          })
          .then((response) => {
            if (response.data.code === 1){
              setModal(true);
              setModalText('회원가입에 성공했습니다. 로그인 하시겠습니까?');
            }else{
              console.log('회원가입에 오류가 생겼습니다.');
            }
          })
          .catch(function (error) {
            
            console.log("Error",error);
          })
        })
      })
    }catch(error){
      console.log('error');
    }
  }

  return(
    <>
      <Helmet>
        <title>회원가입</title>
        <meta name="description" content="뮤직 커뮤니티 사이트" />
        <meta name="keywords" content="음악, 커뮤니티, 굿즈" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="MusicCat" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content="MusicCat! 회원가입" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="뮤직 커뮤니티 사이트" />
      </Helmet>
      <Header></Header>
      <StyledMain>
        <Heading2>회원가입</Heading2>
        <p className="registerInformation">
          <sup>*</sup>필수입력사항
        </p>
        <RegisterForm />
        <RegisterTerms />
        <Button className="registerButton" onClick={handleCheckRegister}>가입하기</Button>
      </StyledMain>
      {
        modal &&
        <RegisterModal onClick={()=>{setModal(false); console.log(modal); if(vaildReg){ navigate("/login");}}}>
          {modalText}
        </RegisterModal>
      }
      <Footer></Footer>
    </>
  );
}

const StyledMain = styled.main`
  width: 640px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;

  & > h2 {
    margin: 100px 0 40px 0;
  }

  & .registerInformation {
    text-align: right;
    font-size: 12px;
    font-weight: 600;
    text-align: right;
    width: 640px;
    margin-bottom: 4px;
    padding: 4px;
  }

  & .registerInformation > sup {
    color: red;
    font-size: 16px;
    position: relative;
    top: -4px;
    left: -4px;
  }

  & > button {
    width: 333px;
    height: 44px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 4px;
    background: #6c816d;
    border: 1px solid #6c816d;
    color: #fff;
    cursor: pointer;
    margin: 40px 0 80px 0;
  }
`;
