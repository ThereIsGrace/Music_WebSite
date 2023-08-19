import styled, { createGlobalStyle } from "styled-components/macro";
import {Button, LinkButton, LoginModal} from "@/pages/Login/index";
import {Form, Input, Label, Header, Footer, Heading2} from "@/components/index";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Helmet} from "react-helmet-async";
import axios from "axios";


export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const movePage = useNavigate();


  const login = async () => {
    try {
      let data = {
        "username": username,
        "password": password
      };
      console.log(data);
      console.log('로그인 시작하려함');
      axios.post('/login', data)
      .then((response) => {
        const {accessToken} = response.data;

        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        console.log('hello2222');
        if(response.status === 200){
          console.log('hello');
          let jwtToken = response.headers.get("Authorization");
          console.log(jwtToken);
          localStorage.setItem("Authorization", jwtToken);
          
          onSilentRefresh();
        }
      }).catch((error) => {
        console.log(error);
      });
      console.log("로그인 성공!");
      //movePage("/");
    } catch (error) {
      console.log(error.message);
      console.log("회원 정보가 존재하지 않습니다.");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSilentRefresh = () => {
    console.log('silentRefresh시작');
    
}
  return (
    <>
      <Helmet>
        <title>로그인</title>
        <meta name="description" content="뮤직 커뮤니티 사이트" />
        <meta name="keywords" content="음악, 커뮤니티, DJ, TURN THE TABLE" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="DJ-UP!" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content="DJ-UP! 로그인페이지" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="음악, 커뮤니티, DJ, TURN THE TABLE" />
      </Helmet>
      <Header />
      <StyledMain>
        <Heading2 className="header">로그인</Heading2>
        <Form className="login" legend="로그인">
          <Label name="username"></Label>
          <Input
            id="username"
            name="username"
            type="id"
            required
            placeholder="아이디를 입력해주세요."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></Input>
          <Label name="password"></Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="비밀번호를 입력해주세요."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Input>
        </Form>
        <Button type="button" onClick={login}>
          로그인
        </Button>
        <LinkButton to="/register">회원가입</LinkButton>
        {isModalOpen && (
          <LoginModal isOpen={isModalOpen} onClose={closeModal}>
            아이디와 비밀번호를 확인해주세요.
          </LoginModal>
        )}
      </StyledMain>
      <Footer />
    </>
  );
}

const StyledMain = styled.main`
  height: 610px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .header {
    padding: 40px;
  }

  & .login {
    padding-bottom: 29px;
  }

  & Label {
    overflow: hidden;
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: circle(0);
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
  }

  & Input {
    display: flex;
    width: 340px;
    height: 50px;
    font-size: 16px;
    padding-left: 20px;
    border: 1px solid #a6a6a6;
    border-radius: 4px;
    margin-bottom: 12px;
  }
`;
