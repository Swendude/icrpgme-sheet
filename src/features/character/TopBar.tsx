import { Character } from "./characterSlice";

import styled, { css } from "styled-components";

const TopBox = styled.div`
  display: flex;
  border: solid;
  border-radius: ${(props) =>
    `${props.theme.borderRadius} ${props.theme.borderRadius} 0 0`};
  padding-bottom: 1%;
  padding-top: 1.5%;
  padding-left: 2.7%;
  padding-right: 2.7%;
  background: black;
  color: white;
  border: 0px;
  justify-content: space-between;
`;

const TopCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const CountBox = styled.div`
  border: 1px solid;
  border-color: white;
  padding: 0.2rem;
  margin: 0.2rem;
  font-size: 0.8rem;

  &&:hover {
    border-color: black;
    color: black;
    background-color: white;
    cursor: pointer;
  }
`;

const Name = styled.h1`
  font-size: 2rem;
  margin: 0px;
  /* overflow: hidden; */
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */
  max-width: 35rem;
`;

const Description = styled.span`
  font-size: 1rem;
  opacity: 0.6;
  text-transform: uppercase;
`;

const TopBar = (props: Partial<Character>) => {
  return (
    <TopBox>
      <TopCol>
        <Name>{props.name}</Name>
        <Description>
          {props.lifeform}·{props.type}
        </Description>
      </TopCol>
      <TopCol>
        <CountBox>10/10 HP</CountBox>
        <CountBox>10/10 SP</CountBox>
      </TopCol>
    </TopBox>
  );
};

export default TopBar;
