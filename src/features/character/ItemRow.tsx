import { Item, Stats, Effort } from "./characterSlice";
import styled from "styled-components";
import ClickableBox from "./ClickableBox";
import { switchItem, moveItem } from "./characterSlice";
import { useAppDispatch } from "../../app/hooks";
interface ItemRowProps {
  item: Item;
  ix: number;
  char_ix: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  margin: 0rem 1.2rem 1.2rem 1.2rem;
  border: 2px solid #000000;
  border-radius: ${({ theme }) =>
    `${theme.borderRadius} 0 0 ${theme.borderRadius}`};
`;

const Header = styled.div`
  display: flex;
  background-color: black;
  color: white;
  align-items: center;
  padding: 0.4rem 0.4rem 0.2rem 0.4rem;
  justify-content: space-between;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${(props) => props.theme.fontLg};
  flex: 1;
  text-transform: uppercase;
`;

const Description = styled.p`
  margin: 1rem 0rem 0.5rem 0rem;
  font-size: ${(props) => props.theme.fontMd};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-start;
  padding-left: 0.4rem;
  padding-bottom: 0.4rem;
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const StatLabel = styled.div`
  color: white;
  background-color: black;
  padding: 0.2rem;
  font-size: ${(props) => props.theme.fontSm};
  font-weight: bold;
  border-radius: 0.2rem;
  padding-left: 0.6rem;

  /* ::before {
    content: "• ";
  } */
`;

const StatRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const ItemRow = ({ item, ix, char_ix }: ItemRowProps) => {
  const dispatch = useAppDispatch();
  return (
    <Container>
      <Header>
        <Title>{item.name}</Title>
        <ClickableBox
          onClick={() => dispatch(moveItem({ char_ix, item_ix: ix, up: true }))}
        >
          ▲
        </ClickableBox>
        <ClickableBox
          onClick={() =>
            dispatch(moveItem({ char_ix, item_ix: ix, up: false }))
          }
        >
          ▼
        </ClickableBox>
        <ClickableBox
          onClick={() => {
            dispatch(switchItem({ item_ix: ix, char_ix }));
          }}
        >
          {item.equipped ? "EQUIPPED" : "CARRYING"}
        </ClickableBox>
      </Header>
      <Content>
        <Description>{item.description}</Description>

        <StatRow>
          {Object.keys(item.stats)
            .filter((key: string) => item.stats[key as keyof Stats] !== 0)
            .map((key, i) => (
              <StatLabel key={i}>
                +{item.stats[key as keyof Stats]}{" "}
                {key.toLocaleUpperCase().replace("_", "")}
              </StatLabel>
            ))}
        </StatRow>
        <StatRow>
          {Object.keys(item.effort)
            .filter((key: string) => item.effort[key as keyof Effort] !== 0)
            .map((key, i) => (
              <StatLabel key={i}>
                +{item.effort[key as keyof Effort]} {key.toLocaleUpperCase()}
              </StatLabel>
            ))}
        </StatRow>
        <StatRow>
          {item.hearts !== 0 && (
            <StatLabel>
              +{item.hearts} {"HEART"}
            </StatLabel>
          )}
          {item.stun !== 0 && (
            <StatLabel>
              +{item.stun} {"STUN"}
            </StatLabel>
          )}
        </StatRow>
        <ButtonRow>
          <ClickableBox inverse={true}>EDIT</ClickableBox>
        </ButtonRow>
      </Content>
    </Container>
  );
};

export default ItemRow;
