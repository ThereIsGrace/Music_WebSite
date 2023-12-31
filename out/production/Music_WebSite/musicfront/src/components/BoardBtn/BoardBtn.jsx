import React from "react";
import styled, {css} from "styled-components";
import {Link} from "react-router-dom";
import palette from "@/assets/Styles/palette";

export const BoardBtn = (props) => {
  return props.to ? <StyledLink {...props} cyan={props.cyan ? 1 : 0} /> : <StyledButton {...props} />;
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
  background: rgb(85, 85, 85);
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
    props.blue &&
    css`
      background: rgb(85, 85, 85);
      &:hover {
        background: ${palette.blue[1]};
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

const StyledLink = styled(Link)`
  ${buttonStyle}
`;
