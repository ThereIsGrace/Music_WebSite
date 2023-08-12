import styled, {css} from "styled-components";
import palette from "@/assets/Styles/palette";

export const SubInfo = ({username, publishedDate, hasMarginTop}) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <span>
        <b>{username}</b>
      </span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  );
};

const SubInfoBlock = styled.div`
  text-align: right;

  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}
  color: ${palette.gray[6]};

  /**span 사이에 가운뎃점 문자 보여 주기 */
  span + span:before {
    color: ${palette.gray[4]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: "\\07"; /**가운뎃점 문자 */
  }
`;
