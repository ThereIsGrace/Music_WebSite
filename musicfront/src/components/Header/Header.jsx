import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {Image, Heading1, Button, Input} from "@/components";
import Logo from "@/assets/Home/logo.png";
import {atom, useRecoilState} from "recoil";
import {uidAtom} from "@/pages/Register/atoms/uidAtom";
import {useEffect} from "react";

export const checkCurrentUserStateAtom = atom({
  key: "checkCurrentUserStateAtom",
  default: false,
});

export function Header() {
  const [checkCurrentUserState, setCheckCurrentUserState] = useRecoilState(checkCurrentUserStateAtom);
  const [uid, setUid] = useRecoilState(uidAtom);

  const navigate = useNavigate();

  // 로그인 상태 확인
  useEffect(() => {
    const unsub = () => {
      const user = {id: "loggedinId"}; // 로그인 중인 아이디?
      if (user) {
        const userId = user.id;
        setCheckCurrentUserState(true);
        setUid(userId);
      } else {
        setCheckCurrentUserState(false);
        setUid("");
      }
    };
    return unsub;
  }, [checkCurrentUserState, setCheckCurrentUserState, setUid, uid]);

  // log out
  async function handleLogout() {
    try {
      // ~로그아웃 펑션~
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <StyledHeader>
      <Heading1>
        <Link to="/" className="imgContainer">
          <Image src={Logo} alt="DJ-UP!" />
        </Link>
      </Heading1>

      <nav>
        <ul>
          <li>
            <Link to="/">아티스트</Link>
          </li>
          <li>
            <Link to="/PopularProduct">인기</Link>
          </li>
          <li>
            <Link to="/board">커뮤니티</Link>
          </li>
        </ul>
      </nav>
      <Input type="text" placeholder="아티스트/앨범/노래 검색하기"></Input>
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
  display: flex;
  width: 100%;
  height: 64px;
  justify-content: center;
  top: 0;
  line-height: 64px;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 999;

  & img {
    width: 110px;
    height: 85px;
    margin-left: 0;
  }

  & nav {
    margin-left: 20px;
    min-width: 310px;
  }

  & li {
    float: left;
    margin: 0;
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
    color: #6c816d;
    background-color: white;
    font-size: 14px;
  }

  & .joinBtn {
    border: 2px solid #6c816d;
    border-radius: 12px;
    padding: 10px 12px;

    &:hover {
      color: #fff;
      background-color: #6c816d;
    }
  }

  & .registerButton {
    background-color: #6c816d;
    color: white;
  }

  & input {
    width: 400px;
    height: 40px;
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
    color: #212124;
    width: 64px;
    height: 24px;
    font-weight: 700;
    font-size: 18px;
    margin: 0 20px;
  }

  & a:hover {
    color: #eca997;
  }

  & .imgContainer {
    width: 130px;
    height: 64px;
    margin-left: 0;
  }

  & .logoutBtn {
    color: #6c816d;
    border-radius: 12px;
    padding: 10px 12px;

    &:hover {
      color: #eca997;
    }
  }

  & .MypageBtn {
    font-size: 14px;
    width: 30px;
    margin-right: 0;
    border: 2px solid #6c816d;
    padding: 10px 6px;
    border-radius: 12px;
    color: #6c816d;

    &:hover {
      background-color: #6c816d;
      color: #fff;
    }
  }
`;
