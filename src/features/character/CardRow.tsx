import React, { FunctionComponent } from "react";
import styled from "styled-components";
interface CardRowProps {
  label: string;
  value: number;
  extra?: string;
}

const Container = styled.div`
  display: flex;
  color: black;
  background-color: #eeeeee;
  padding: 0.2rem;
  margin-bottom: 0.4rem;
  align-items: stretch;
  width: 100%;
  border-left: 4px solid black;
`;

const LabelText = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  align-self: flex-end;
`;

const ValueText = styled.h3`
  margin: 0;
  font-size: 1.8rem;
  flex-grow: 1;
  text-align: right;
`;

const ExtraText = styled.h4`
  margin: 0;
  font-size: 0.8rem;
  align-self: flex-end;
  opacity: 0.4;
  padding-left: 0.2rem;
`;

const CardRow: FunctionComponent<CardRowProps> = (props) => {
  return (
    <Container>
      <LabelText>{props.label}</LabelText>
      {props.extra && <ExtraText>{props.extra}</ExtraText>}
      <ValueText>{props.value}</ValueText>
    </Container>
  );
};

export default CardRow;
