import React, { FunctionComponent } from "react";
import styled from "styled-components";

interface CardSpacerProps {
  title: string;
}

const SpacerRow = styled.div`
  color: black;
  opacity: 0.4;
  text-transform: uppercase;
  display: flex;
  align-items: center;
`;

const SpacerLine = styled.hr`
  flex-grow: 1;
  border: solid black;
  border-width: ${(props) => props.theme.borderWidth} 0 0 0;
`;

const SpacerTitle = styled.h3`
  font-size: 0.6rem;
  margin: 0.4rem 0;
`;

const CardSpacer: FunctionComponent<CardSpacerProps> = (props) => {
  return (
    <SpacerRow>
      <SpacerLine />
      <SpacerTitle>{props.title}</SpacerTitle>
      <SpacerLine />
    </SpacerRow>
  );
};

export default CardSpacer;
