import { Item } from "./characterSlice";
import styled from "styled-components";
import ClickableBox from "./ClickableBox";
import { switchItem } from "./characterSlice";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
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
`;

const Description = styled.p`
  margin: 1rem 0rem 0.5rem 0.4rem;
`;

const ItemRow = ({ item, ix, char_ix }: ItemRowProps) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Header>
        <Title>{item.name}</Title>
        <ClickableBox
          onClick={() => {
            dispatch(switchItem({ item_ix: ix, char_ix }));
          }}
        >
          {item.equipped ? "EQUIPPED" : "CARRYING"}
        </ClickableBox>
      </Header>
      <Description>{item.description}</Description>
    </Container>
  );
};

export default ItemRow;
