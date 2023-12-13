import styled, {css} from "styled-components";
import palette from "@/assets/Styles/palette";
import { Image } from "..";

export const SubInfo = ({username, publishedDate, hasMarginTop}) => {
  console.log(username, 'username?');
  console.log(publishedDate, 'pdate?');
  const makeDate = (publishedDate) => {
    const day = publishedDate.substr(0, 10);
    const time = publishedDate.substr(11, 5);
    return day + " " + time
  }
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <div className="sub-info">
      <span>
        <b>{username}</b>
        
      </span>
      <span className="date">{makeDate(publishedDate)}</span>

      </div>
    </SubInfoBlock>
  );
};

const SubInfoBlock = styled.div`
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;

  & .sub-info {
    display: flex;
    //width: 920px;
    width: 100%;
    justify-content: space-between;
  }

  & b {
    font-size: 16px;
  }


  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}
  color: ${palette.gray[6]};

  & .date {
    font-size: 14px;
  }
   
`;
