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
  justify-content: stretch;
  align-items: center;
  padding: 0rem 1.2rem;
`;

const SpacerLine = styled.hr`
  border: solid black;
  flex-grow: 1;
  margin: 0rem;
  border-width: ${(props) => props.theme.borderWidth} 0 0 0;
`;

const SpacerTitle = styled.h3`
  font-size: ${(props) => props.theme.fontMd};
  margin: 0rem 0.6rem;
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
