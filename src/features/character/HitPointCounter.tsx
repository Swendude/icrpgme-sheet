import { CharacterHealth } from "./characterSlice";
import { characterHealthToView } from "./characterSlice";

const HitPointCounter = (props: {
  hitpoints: CharacterHealth;
  total: number;
}) => {
  return (
    <svg width={100} height={100} viewBox="-50 -50 100 100">
      <mask id="heartmask">
        <path
          d="M 0 48 L 40 8 A 4 4 90 0 0 0 -32 A 4 4 90 0 0 -40 8 L 0 48 Z"
          fill="white"
          stroke="none"
        />
      </mask>

      {props.hitpoints.state === "Not Dying" && (
        <g mask="url(#heartmask)">
          <rect
            fill="#d62828"
            transform="scale(1 -1)"
            x="-50"
            y="-45"
            width="100"
            height={(props.hitpoints.hitpoints / (props.total * 10)) * 100}
          />
        </g>
      )}
      <path
        d="M 0 48 L 40 8 A 4 4 90 0 0 0 -32 A 4 4 90 0 0 -40 8 L 0 48 Z"
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
  );
  //   <h3>{props.hitpoints && characterHealthToView(props.hitpoints)}</h3>;
};
export default HitPointCounter;
