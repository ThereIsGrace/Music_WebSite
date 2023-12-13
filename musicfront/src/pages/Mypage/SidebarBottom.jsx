import {Link} from "react-router-dom";
import {ReactComponent as Person} from "@/assets/Mypage/person.svg";
import {ReactComponent as Buy} from "@/assets/Mypage/bag-frame.svg";
import {ReactComponent as Receipt} from "@/assets/Mypage/receipt.svg";
import {ReactComponent as Heart} from "@/assets/Mypage/heart.svg";
import {ReactComponent as Tag} from "@/assets/Mypage/tag.svg";
import {ReactComponent as Gear} from "@/assets/Mypage/gear.svg";
import {ReactComponent as Envelope} from "@/assets/Mypage/envelope.svg";
import styled from "styled-components/macro";
import { uidAtom } from "../Register/atoms/uidAtom";
import { useRecoilValue } from "recoil";

export function SidebarBottom() {
  const uid = useRecoilValue(uidAtom);
  return (
    <SidebarList>
      <div className="menuTitle">My Page</div>
      <ul className="listTop">
        <Link to="/myPage">
          <li>
            <Person className="listIcon" />
            <span>내정보</span>
          </li>
        </Link>
        {
          uid !== 'admin' &&
          <>
            <Link to="/cart">
              <li>
                <Buy className="listIcon" />
                <span>장바구니</span>
              </li>
            </Link>
            <Link to="/orderList">
              <li>
                <Receipt className="listIcon" />
                <span>주문 내역</span>
              </li>
            </Link>
          </>
        }
      </ul>
      {
        uid === 'admin' &&
        <>
              <ul className="listBottom">
        <Link to="/register/goods">
          <li>
            <Tag className="listIcon" />
            <span>상품 등록</span>
          </li>
        </Link>
        <Link to="/info/write">
          <li>
            <Envelope className="listIcon" />
            <span>공지 등록</span>
          </li>
        </Link>
      </ul>
        </>
      }
    </SidebarList>
  );
}

const SidebarList = styled.div`
  height: 240px;
  background-color: #fbfafa;
  border-radius: 0 0 12px 12px;
  

  & .menuTitle {
    height: 40px;
    background-color: rgb(85, 85, 85);
    color: #fff;
    line-height: 40px;
    padding-left: 18px;
  }

  & ul li {
    margin: 18px 0 0 18px;
    color: #4d5159;
  }

  & ul li span {
    transition: all 0.2s ease-in-out;
  }

  .listIcon {
    fill: #4d5159;
    margin: -2px 4px 0 0;
    vertical-align: middle;
    transition: fill 0.2s ease-in-out;
  }

  .listTop {
    padding: 6px 0 18px 0;
  }

  .listBottom {
    padding-top: 6px;
    border-top: 1px solid #dcdee3;
  }

  & ul li:hover .listIcon,
  & ul li:hover {
    fill: #eca997;
    color: #eca997;
  }
`;
