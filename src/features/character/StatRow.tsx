import React, { FunctionComponent } from "react";
import styled from "styled-components";
interface CardRowProps {
  label: string;
  value: number;
  extra?: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  color: black;
  margin: 1rem 1.2rem;
  border: 2px solid #000000;
  border-radius: ${({ theme }) =>
    `${theme.borderRadius} 0 0 ${theme.borderRadius}`};
`;

const LabelText = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const ExtraText = styled.span`
  font-size: 0.7rem;
  opacity: 0.4;
  padding-left: 0.2rem;
`;

const ValueText = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  text-align: center;
`;

const Label = styled.div`
  align-self: flex-end;
  margin-left: 0.4rem;
`;
const Value = styled.div`
  background-color: black;
  color: white;
  min-width: 3.6em;
  padding: 0.4rem 0rem;
`;

const StatRow: FunctionComponent<CardRowProps> = (props) => {
  return (
    <Container>
      <Label>
        <LabelText>
          {props.label}
          {props.extra && <ExtraText>{props.extra}</ExtraText>}
        </LabelText>
      </Label>
      <Value>
        <ValueText>{props.value}</ValueText>
      </Value>
    </Container>
  );
};

export default StatRow;
