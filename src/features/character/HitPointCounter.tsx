import { Character, CharacterHealth } from "./characterSlice";
import { characterHealthToView } from "./characterSlice";
import styled from "styled-components";
import { Attributes } from "./characterSlice";
const HpText = styled.span`
  color: black;
  font-size: 2em;
`;
const HitPointCounter = (props: {
  hitpoints: CharacterHealth;
  total: number;
}) => {
  console.log(props.total);
  return (
    <div>
      <svg width={100} height={100} viewBox="-60 -60 110 110">
        <mask id="heartmask">
          <path
            d="M 21 -43.25 C 12.55 -43.25 4.8 -39.3 -0.2 -32.8 C -5.2 -39.3 -12.95 -43.25 -21.4 -43.25 C -36.175 -43.25 -48.2 -31.175 -48.2 -16.325 C -48.2 -9.35 -45.55 -2.725 -40.725 2.325 L -2.925 40.5 L -0.2 43.25 L 2.525 40.5 L 39.6 3.05 C 44.85 -2.025 47.8 -8.925 47.8 -16.325 C 47.8 -31.175 35.775 -43.25 21 -43.25 Z"
            fill="white"
            stroke="none"
          />
        </mask>

        {props.hitpoints.state === "Not Dying" && (
          <g mask="url(#heartmask)">
            <rect
              fill="#9B2226"
              transform="scale(1 -1)"
              x="-50"
              y="-45"
              width="100"
              height={(props.hitpoints.hitpoints / (props.total * 10)) * 100}
            />
          </g>
        )}
        <path
          d="M 21 -43.25 C 12.55 -43.25 4.8 -39.3 -0.2 -32.8 C -5.2 -39.3 -12.95 -43.25 -21.4 -43.25 C -36.175 -43.25 -48.2 -31.175 -48.2 -16.325 C -48.2 -9.35 -45.55 -2.725 -40.725 2.325 L -2.925 40.5 L -0.2 43.25 L 2.525 40.5 L 39.6 3.05 C 44.85 -2.025 47.8 -8.925 47.8 -16.325 C 47.8 -31.175 35.775 -43.25 21 -43.25 Z"
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
          {props.hitpoints && characterHealthToView(props.hitpoints)}/
          {props.total * 10}
        </text>
      </svg>
    </div>
  );
  //   <h3>{props.hitpoints && characterHealthToView(props.hitpoints)}</h3>;
};
export default HitPointCounter;
