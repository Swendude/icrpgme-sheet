import React, { FunctionComponent } from "react";
import styled from "styled-components";
interface CardRowProps {
  label: string;
}

const Container = styled.div`
  display: flex;
  color: black;
  background-color: #eeeeee;
  padding: 0.2em;
  margin-bottom: 0.2em;
`;

const LabelText = styled.h3`
  margin: 0;
  font-size: 1em;
`;

const CardRow: FunctionComponent<CardRowProps> = (props) => {
  return (
    <Container>
      <LabelText>{props.label}</LabelText>
    </Container>
  );
};

export default CardRow;
