import { PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const ClickCircle = styled.circle`
  &&:hover {
    cursor: pointer;
  }
`;

const HeroCoinToggle = (props: {
  coin: boolean;
  dispatchAction: PayloadAction<{ char_ix: number }>;
}) => {
  const dispatch = useDispatch();
  return (
    <svg width={100} height={100} viewBox="-50 -50 100 100">
      <circle cx="0" cy="0" r="45" fill="none" stroke="#000" strokeWidth="4" />
      <ClickCircle
        cx="0"
        cy="0"
        r="40"
        fill={props.coin ? "black" : "#FFFDF7"}
        stroke="#000"
        strokeWidth="2"
        onClick={() => dispatch(props.dispatchAction)}
      />
    </svg>
  );
};
export default HeroCoinToggle;
