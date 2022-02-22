const StunPointCounter = (props: { stunpoints: number; total: number }) => {
  return (
    <svg width={100} height={100} viewBox="-50 -50 100 100">
      <mask id="circlemask">
        <circle cx="0" cy="0" r="48" fill="white" stroke="none" />
      </mask>

      <g mask="url(#circlemask)">
        <rect
          fill="#5DA9E9"
          transform="scale(1 -1)"
          x="-50"
          y="-45"
          width="100"
          height={(props.stunpoints / (props.total * 10)) * 100}
        />
      </g>

      <circle cx="0" cy="0" r="46" fill="none" stroke="#000" strokeWidth="4" />
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
  );
};
export default StunPointCounter;
