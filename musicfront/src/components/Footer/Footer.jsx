import {Link} from "react-router-dom";
import styled from "styled-components";
import {Image} from "@/components";
import facebook from "@/assets/Home/facebook.png";
import instargram from "@/assets/Home/instargram.png";
import youtube from "@/assets/Home/youtube.png";
import naverblog from "@/assets/Home/naverblog.png";

export function Footer() {
  return (
    <StyledFooter>
      <div className="sectionContainer">
        <div className="section-all">
        <div className="company-name">
          <span className="bu">주식회사 뮤직캣(MusicCat)</span>
        </div>
        <div className="business-represent">
          <span className="bu">대표이사: 정재은</span>
        </div>
        <div className="github-address">
          <b>개발자 깃허브 주소</b>
          <span className="bu">깃허브 주소 넣기</span>
        </div>
        <div className="my-email">
          <span className="bu">개발자 이메일: universe2879@gmail.com</span>
        </div>
        <div className="rights">
          <span>ⓒ 2023. all rights reserved by Jeong Jaeeun</span>
        </div>
        <div className="purpose">
          본 웹사이트는 포트폴리오용으로 만들어진 웹사이트입니다.
        </div>

        </div>

        <section className="container">
          <Link to={"#"}>
            <Image src={facebook} alt="페이스북" />
          </Link>
          <Link to={"#"}>
            <Image src={instargram} alt="인스타그램" />
          </Link>
          <Link to={"#"}>
            <Image src={youtube} alt="유튜브" />
          </Link>
          <Link to={"#"}>
            <Image src={naverblog} alt="네이버 블로그" />
          </Link>
        </section>
      </div>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  background-color: rgb(250, 250, 250);
  width: 100%;
  margin: 0 auto;
  color: rgb(51,51,51);
  bottom: 0;


  & .company-name {
    font-weight: 600;
    margin-bottom: 30px;
  }


  & .section-all {
    padding: 50px 50px 20px 50px;
    color: rgb(51,51,51);
    width: 1096px;
    margin: 0 auto;
    
  }

  & .my-email {
    margin-bottom: 20px;
  }

  & .container {
    width: 1096px;
    padding: 0 50px;
    display: flex;
    gap: 20px;
    justify-content: center;
    padding-bottom: 50px;
  }
`;
