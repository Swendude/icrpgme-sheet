import { Character } from "./characterSlice";

import styled, { css } from "styled-components";

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  border: solid;
  border-radius: ${(props) =>
    `${props.theme.borderRadius} ${props.theme.borderRadius} 0 0`};
  align-items: center;
  padding-bottom: 10px;
  padding-top: 10px;
  background: black;
  color: white;
  border: 0px;
`;

const Name = styled.h1`
  font-size: 2.2em;
  margin: 6px;
`;

const Description = styled.span`
  font-size: 0.8em;
  opacity: 0.6;
`;

const TopBar = (props: Partial<Character>) => {
  return (
    <TopBox>
      <Name>{props.name}</Name>
      <Description>
        {props.lifeform} - {props.type}
      </Description>
    </TopBox>
  );
};

export default TopBar;
