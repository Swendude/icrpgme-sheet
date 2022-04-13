import { Item } from "./characterSlice";
import styled from "styled-components";

interface ItemRowProps {
  item: Item;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  margin: 1rem 1.2rem;
  border: 2px solid #000000;
  border-radius: ${({ theme }) =>
    `${theme.borderRadius} 0 0 ${theme.borderRadius}`};
`;

const Header = styled.div`
  display: flex;
  background-color: black;
  color: white;
  align-items: center;
  padding: 0.4rem 0.4rem 0.8rem 0.4rem;
  justify-content: space-between;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 2rem;
`;
const EquipOuter = styled.div`
  border-radius: 50%;
  border: 2px white solid;
  height: 2rem;
  width: 2rem;
  display: flex;
`;

const EquipState = styled.div<{ state: boolean }>`
  border-radius: 50%;
  background-color: ${({ state }) => `${state ? "white" : `black`}`};
  border: ${({ state }) => `${state ? "2px white solid" : `2px white dotted`}`};
  height: 1.5rem;
  width: 1.5rem;
  margin: auto auto;
`;

const ItemRow = ({ item }: ItemRowProps) => {
  return (
    <Container>
      <Header>
        <Title>{item.name}</Title>
        <EquipOuter>
          <EquipState state={item.equipped} />
        </EquipOuter>
      </Header>
      <p>{item.description}</p>
      {item.hearts ? <p>ADDS 1 HEART</p> : <></>}
    </Container>
  );
};

export default ItemRow;
