import styled from "styled-components";
import { useDispatch } from "react-redux";
import { switchHeroCoin } from "./characterSlice";
interface InfoRowProps {
  herocoin: boolean;
  coin: number;
  ix: number;
}

interface HeroCoinCircleProps {
  isActive: boolean;
}
const HeroCoinCircle = styled.div`
  border-radius: 50%;
  border: 2px solid black;
  width: 4rem;
  height: 4rem;
  margin: auto;
  display: flex;
`;
const HeroCoinInnerCircle = styled.div<HeroCoinCircleProps>`
  border-radius: 50%;
  width: 80%;
  background-color: ${(props) => (props.isActive ? `black` : `white`)};
  height: 80%;
  margin: auto;
  border: 2px dotted black;
  cursor: pointer;
`;

const InfoLabel = styled.h3`
  margin: 0.4rem 0rem;
  font-size: 1rem;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0rem;
`;

const Row = styled.div`
  color: black;
  display: flex;
  padding: 0rem 1.2rem;
  justify-content: space-around;
`;
interface CoinTextProps {
  length: number;
}

const CoinText = styled.h3<CoinTextProps>`
  margin: 0;
  font-size: ${({ length }) => `${3 / length}rem`};
  min-width: 3rem;
  text-align: center;
`;

const CoinTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
`;
const InfoRow = (props: InfoRowProps) => {
  const dispatch = useDispatch();
  return (
    <Row>
      <InfoBlock>
        <InfoLabel>HEROCOIN</InfoLabel>
        <HeroCoinCircle>
          <HeroCoinInnerCircle
            isActive={props.herocoin}
            onClick={() => dispatch(switchHeroCoin({ char_ix: props.ix }))}
          />
        </HeroCoinCircle>
      </InfoBlock>
      <InfoBlock>
        <InfoLabel>COIN</InfoLabel>
        <CoinTextBlock>
          <CoinText length={props.coin.toString().length}>
            {props.coin}
          </CoinText>
        </CoinTextBlock>
      </InfoBlock>
    </Row>
  );
};

export default InfoRow;
