import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {Image, Heading1, Button, Search} from "@/components";
import musicCatLogo from "@/assets/websiteLogo/music-website-cat-logo.png";
import {atom, useRecoilState, useRecoilValue} from "recoil";
import {uidAtom} from "@/pages/Register/atoms/uidAtom";
import {useEffect} from "react";
import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { SERVER_URL } from "@/constants";
import axios from "axios";
import { Cookies } from "react-cookie";


export const checkCurrentUserStateAtom = atom({
  key: "checkCurrentUserStateAtom",
  default: false,
});

export function Header() {
  const [checkCurrentUserState, setCheckCurrentUserState] = useRecoilState(checkCurrentUserStateAtom);
  const [uid, setUid] = useRecoilState(uidAtom);
  
  const navigate = useNavigate();
  const cookies = new Cookies();

  const getUserInfo = () => {
    const cookies = new Cookies();
    if (cookies.get('ILOGIN') === 'Y'){
      axiosInstance.get(SERVER_URL + 'user/userInfo')
      .then(res => {setUid(res.data.data.username);})
      .catch();
    }
  }

  useEffect(()=>{
    getUserInfo();
  },[checkCurrentUserState])


  // 로그인 상태 확인
  useEffect(() => {
    if (cookies.get('ILOGIN')==='Y'){
      setCheckCurrentUserState(true);
    }
    // const unsub = () => {
    //   const user = {id: "loggedinId"}; // 로그인 중인 아이디?
    //   if (user) {
    //     const userId = user.id;
    //     setCheckCurrentUserState(true);
    //     setUid(userId);
    //   } else {
    //     setCheckCurrentUserState(false);
    //     setUid("");
    //   }
    // };
    // return unsub;
  }, [checkCurrentUserState, setCheckCurrentUserState, setUid, uid]);

  // log out
  async function handleLogout() {
    try {
      axiosInstance.post(SERVER_URL + 'user/logout')
      .then(res => {console.log(res); axios.defaults.headers.common['accessToken'] = null; setCheckCurrentUserState(false);
      window.location.href = '/'})
      .catch(error => console.error(error));

    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <StyledHeader>

      <div className="menu-box">
        <div className="logo-box">
          <Link to="/">
            <img src={musicCatLogo} alt="logo"></img>
          </Link>
        </div>
        <nav>
          <ul>
            <li className="drop-down">
              <Link className="nav-intro">메뉴</Link>
              <div className="drop-down-menu">
                <ul className="title-menu-up">
                  <li className="title-menu">음악감상</li>
                  <li className="sub-menu">
                    <Link to="/recent">최신곡</Link>
                  </li>
                  <li className="sub-menu"><Link to="/popular">인기곡</Link></li>
                </ul>
                <ul className="title-menu-up">
                  <li className="title-menu"><Link to="/goods/shop">상품전체</Link></li>
                  <li className="sub-menu"><Link to="/album">앨범</Link></li>
                  <li className="sub-menu"><Link to="/photoCard">포토카드</Link></li>
                  <li className="sub-menu"><Link to="/lightStick">응원봉</Link></li>
                  <li className="sub-menu"><Link to="/ticket">콘서트티켓</Link></li>
                  <li className="sub-menu"><Link to="/garment">의류</Link></li>
                  <li className="sub-menu"><Link to="/stationery">문구류</Link></li>
                </ul>
                <ul className="title-menu-up">
                  <li className="title-menu">게시판</li>
                  <li className="sub-menu"><Link to="/board">자유게시판</Link></li>
                </ul>
                <ul className="title-menu-up">
                  <li className="title-menu">공지사항</li>
                </ul>
              </div>
            </li> 
          </ul>
        </nav> 
      </div>


      <Search />
      <div className="buttonContainer">
        {!checkCurrentUserState && (
          <>
            <Link to="/login" className="loginButton loginBtn">
              로그인
            </Link>
            <Link to="/register" className="loginButton joinBtn">
              회원가입
            </Link>
          </>
        )} 
        {checkCurrentUserState && (
          <>
            <Link to="/mypage" className="MypageBtn">
              MyPage
            </Link>
            <Button type="button" aria-label="로그아웃" className="loginButton logoutBtn" onClick={handleLogout}>
              로그아웃
            </Button>
          </>
        )}
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background-color: white;
  color: black;
  display: flex;
  width: 100%;
  height: 65px;
  justify-content: space-between;
  align-items: center;
  top: 0;
  line-height: 50px;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 999;
  margin: 0;
  padding: 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 4px;
  overflow: visible;

  & .goods {
    position: absolute;
  }

  & .drop-down {
    &:hover .drop-down-menu {
      display: flex;
      justify-content: space-evenly;
      position: absolute;
      top: 65px;
      left: 0;
      width: 100%;
      padding: 0 0 30px;
      text-align: left;
      background-color: white;
      border-top: 1px solid rgb(228, 228, 231);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 4px;
    }

    & .drop-down-menu {
      display: none;
    } 
  } 

  & .title-menu-up{
    display: flex;
    flex-direction: column;

    .title-menu {
      margin-bottom: 3px;
      font-weight: 700;
      font-size: 20px;
    }
    li {
      height: 30px;
    }
  }


  & .menu-box {
    height: 100%;
    display: flex;
  }
  & .logo-box {
    margin: 20px;
    width: 70px;
    line-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .logo-box img {
    width: 55px;
  }
  & nav {
    /* margin-left: 20px; */
    margin: 0;
    align-items: center;
    text-align:center;
  }
  & nav ul {
    display:inline-block;
  }

  & .nav-intro {
    font-weight: 700;
  }
  & li {
    line-height: 65px;
    float: left;  // li가 float이 된 상태로는 vertical-align으로 정렬할 수 없다
    // li의 높이가 100%라고 해서 li 내부의 글들의 높이도 100%가 되는 건 아니다.
  }

  & button {
    width: 100px;
    height: 40px;
    margin: 12px 16px;
    margin: 0;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    font-size: 18px;
  }

  & .buttonContainer {
    min-width: 200px;
  }

  & .loginButton {
    font-weight: 600;
    color: black;
    background-color: white;
    font-size: 14px;
  }

  & .loginBtn {
    margin-right: 10px;
  }

  & .joinBtn {
    border: 2px solid skyblue;
    border-radius: 12px;
    padding: 10px 12px;

    &:hover {
      color: #fff;
      background-color:skyblue;
    }
  }

  & .registerButton {
    background-color: black;
    color: white;
  }

  & input {
    width: 400px;
    height: 30px;
    margin: 0 24px;
    margin-top: 12px;
    border-radius: 6px;
    border: none;
    background-color: #f2f3f6;
    padding-left: 10px;
    font-weight: 400;
    font-size: 16px;
  }

  & a {
    text-decoration-line: none;
    color: black;
    width: 64px;
    height: 24px;
    font-size: 18px;
  }

  & a:hover {
    color: red;
  } 

  & .imgContainer{
    width: 80px;
    //height: 100px;
    //margin-left: 0;
    overflow: hidden;
  }

  & .imgContainer Image {
    width: 100%;
  }

  & .logoutBtn {
    color: black;
    border-radius: 12px;
    padding: 10px 12px;
    font-weight: bold;

    &:hover {
      color: skyblue;
    }
  }

  & .MypageBtn {
    font-size: 14px;
    width: 30px;
    margin-right: 0;
    border: 2px solid skyblue;
    padding: 10px 6px;
    border-radius: 12px;
    color: black;
    font-weight: bold;

    &:hover {
      background-color: skyblue;
      color: #fff;
    }
  }
`;
