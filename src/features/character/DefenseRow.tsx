import styled from "styled-components";
interface DefenseRowProps {
  defense: number;
  armor: number;
}

const DefenseLabel = styled.h3`
  margin: 0.4rem 0rem;
  font-size: ${(props) => props.theme.fontMd};
`;

const DefenseBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0rem;
`;

const Row = styled.div`
  color: black;
  display: flex;
  justify-content: space-around;
`;
interface CoinTextProps {
  length: number;
}

const DefenseText = styled.h3<CoinTextProps>`
  margin: 0;
  font-size: ${({ length }) => `${6 / length}rem`};
  min-width: 2rem;
  min-height: 4rem;
  text-align: center;
  border: 2px solid black;
  border-top: 4px solid black;
  border-radius: 0% 0% 50% 50%;
  padding: 0.3rem;
`;

const DefenseRow = (props: DefenseRowProps) => {
  return (
    <Row>
      <DefenseBlock>
        <DefenseText length={props.armor.toString().length}>
          {props.armor}
        </DefenseText>
        <DefenseLabel>{`${props.defense} TO ROLL`}</DefenseLabel>
      </DefenseBlock>
    </Row>
  );
};

export default DefenseRow;
