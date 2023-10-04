import React from "react";
import styled, {css} from "styled-components";
import palette from "@/assets/Styles/palette";
import {useRecoilState} from "recoil";
import {pageAtom} from "@/pages/SearchResult";

export const PageBtn = (props) => {
  const [page, setPage] = useRecoilState(pageAtom);

  const prev = () => {
    setPage(page - 1);
  };

  const next = () => {
    setPage(page + 1);
  };

  return props.disabled ? <StyledButton {...props} blue={props.blue ? 0 : 1} /> : props.title === "prev" ? <StyledButton {...props} onClick={prev} /> : <StyledButton {...props} onClick={next} />;
};

const buttonStyle = css`
  margin: 5px;
  border: none;
  border-radius: 4px;
  font-family: Jua;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  min-width: 10px;
  width: 110px;
  text-align: center;
  background: ${palette.blue[2]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.blue[1]};
      &:hover {
        background: ${palette.blue[0]};
      }
    `}

    &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;
