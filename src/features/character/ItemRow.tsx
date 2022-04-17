import { Item, Stats, Effort } from "./characterSlice";
import styled from "styled-components";
import ClickableBox from "./ClickableBox";
import { switchItem } from "./characterSlice";
import { useDrag } from "react-dnd";
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
  flex-grow: 1;
  text-transform: uppercase;
`;

const Description = styled.p`
  margin: 1rem 0rem 0.5rem 0rem;
  font-size: ${(props) => props.theme.fontLg};
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
  margin-top: 2rem;
  justify-content: flex-end;
  width: 100%;
`;

const StatRow = styled.div`
  /* background-color: black; */
  color: black;
  font-size: ${(props) => props.theme.fontMd};
  opacity: 0.4;
  font-weight: bold;
  /* padding: 0.4rem; */
`;

const ItemRow = ({ item, ix, char_ix }: ItemRowProps) => {
  const dispatch = useAppDispatch();
  return (
    <Container>
      <Header>
        <Title>{item.name}</Title>
        <ClickableBox>▲</ClickableBox>
        <ClickableBox>▼</ClickableBox>
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
        {Object.keys(item.stats)
          .filter((key: string) => item.stats[key as keyof Stats] !== 0)
          .map((key) => (
            <StatRow>
              +{item.stats[key as keyof Stats]} {key.toLocaleUpperCase()}
            </StatRow>
          ))}
        {Object.keys(item.effort)
          .filter((key: string) => item.effort[key as keyof Effort] !== 0)
          .map((key) => (
            <StatRow>
              +{item.effort[key as keyof Effort]} {key.toLocaleUpperCase()}
            </StatRow>
          ))}
        <ButtonRow>
          <ClickableBox inverse={true}>EDIT</ClickableBox>
          <ClickableBox>DESTROY</ClickableBox>
        </ButtonRow>
      </Content>
    </Container>
  );
};

export default ItemRow;
