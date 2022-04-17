import styled from "styled-components";

export const ClickableBox = styled.div`
  border: 1px solid;
  border-color: white;
  padding: 0.2rem;
  margin: 0.2rem;
  font-size: ${(props) => props.theme.fontMd};

  &&:hover {
    border-color: black;
    color: black;
    background-color: white;
    cursor: pointer;
  }
`;

export default ClickableBox;
