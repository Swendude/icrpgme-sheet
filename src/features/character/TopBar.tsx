import { Character } from "./characterSlice";

import styled, { css } from "styled-components";

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  /* border-radius: ${(props) =>
    `${props.theme.borderRadius} ${props.theme.borderRadius} 0 0`}; */
  align-items: center;
  padding: 0.3em;
  padding-bottom: 0.6em;
  background: black;
  color: ${(props) => props.theme.colors.background};
`;

const Name = styled.h1`
  font-size: 1.4em;
  text-align: center;
  margin: 0.6em;
  margin-bottom: 0.3em;
  text-transform: uppercase;
`;

const Description = styled.span`
  font-size: 0.7em;
  color: ${(props) => props.theme.colors.main};
  text-align: center;
  text-transform: uppercase;
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
