import React, { FunctionComponent } from "react";
import styled from "styled-components";
interface CardRowProps {
  label: string;
  value: number;
}

const Container = styled.div`
  display: flex;
  color: black;
  background-color: #eeeeee;
  padding: 0.2rem;
  margin-bottom: 0.2rem;
  align-items: stretch;
  width: 100%;
`;

const LabelText = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  justify-self: end;
`;

const ValueText = styled.h3`
  margin: 0;
  font-size: 1.8rem;
  flex-grow: 1;
  text-align: right;
`;

const CardRow: FunctionComponent<CardRowProps> = (props) => {
  return (
    <Container>
      <LabelText>{props.label}</LabelText>
      <ValueText>{props.value}</ValueText>
    </Container>
  );
};

export default CardRow;
