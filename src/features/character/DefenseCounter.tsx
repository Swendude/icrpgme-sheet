const DefenseCounter = (props: { defense: number }) => {
  return (
    <svg width={100} height={100} viewBox="-50 -50 100 100">
      <path
        d="M 0 -48 L 38 -43 L 38 0 C 38 25 16 40 0 48 C -16 40 -38 25 -38 0 L -38 -43 Z"
        fill="#ddd"
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
        {props.defense}
      </text>
    </svg>
  );
};
export default DefenseCounter;
