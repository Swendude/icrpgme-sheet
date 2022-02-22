import { Character, CharacterHealth } from "./characterSlice";
import { characterHealthToView } from "./characterSlice";
import styled from "styled-components";
import { Attributes } from "./characterSlice";
const HpText = styled.span`
  color: black;
  font-size: 2em;
`;
const StunPointCounter = (props: { stunpoints: number; total: number }) => {
  return (
    <div>
      <svg width={100} height={100} viewBox="-54 -54 106 106">
        <mask id="circlemask">
          <circle cx="0" cy="0" r="46" fill="white" stroke="none" />
        </mask>

        <g mask="url(#circlemask)">
          <rect
            fill="#777DA7"
            transform="scale(1 -1)"
            x="-50"
            y="-45"
            width="100"
            height={(props.stunpoints / (props.total * 10)) * 100}
          />
        </g>

        <circle
          cx="0"
          cy="0"
          r="46"
          fill="none"
          stroke="#000"
          strokeWidth="4"
        />
        <text
          x="0"
          y="0"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
        >
          {props.stunpoints}/{props.total * 10}
        </text>
      </svg>
    </div>
  );
};
export default StunPointCounter;
