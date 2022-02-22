import React from "react";
import { PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: stretch;
  padding: 5px;
`;

type buttonProps = {
  valType: boolean;
};

const OptionButton = styled.button<buttonProps>`
  border-radius: 50%;
  border: solid;
  border-color: black;
  border-width: ${(props) => props.theme.borderWidth};
  background-color: black;
  color: white;
  height: 3em;
  width: 3em;
  padding: 0;
  font-weight: bold;
  font-size: 0.7em;

  &&:hover {
    background-color: ${(props) =>
      props.valType
        ? props.theme.colors.positive_change
        : props.theme.colors.negative_change};
    cursor: pointer;
  }
`;

const NumberOptionsMenu = (props: {
  scale: number[];
  dispatchAction: (
    change: number
  ) => PayloadAction<{ char_ix: number; change: number }>;
}) => {
  const dispatch = useAppDispatch();

  return (
    <ButtonContainer>
      {props.scale.map((val, i) => (
        <OptionButton
          valType={val >= 0}
          key={i}
          onClick={() => dispatch(props.dispatchAction(val))}
        >
          {val > 0 ? `+${val}` : val}{" "}
        </OptionButton>
      ))}
    </ButtonContainer>
  );
};
export default NumberOptionsMenu;
