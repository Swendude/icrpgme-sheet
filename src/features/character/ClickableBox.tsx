import styled from "styled-components";

interface ClickableBoxProps {
  inverse?: boolean;
}

export const ClickableBox = styled.div<ClickableBoxProps>`
  border: 1px solid;
  border-color: ${(props) => (props.inverse ? "black" : "white")};
  background-color: ${(props) => (props.inverse ? "white" : "black")};
  color: ${(props) => (props.inverse ? "black" : "white")};
  padding: 0.5rem;
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
  font-size: ${(props) => props.theme.fontSm};
  min-width: 1rem;
  text-align: center;
  &&:active {
    border-color: ${(props) => (props.inverse ? "white" : "black")};
    color: ${(props) => (props.inverse ? "white" : "black")};
    background-color: ${(props) => (props.inverse ? "black" : "white")};
    cursor: pointer;
  }
  @media (hover: hover) {
    &&:hover {
      border-color: ${(props) => (props.inverse ? "white" : "black")};
      color: ${(props) => (props.inverse ? "white" : "black")};
      background-color: ${(props) => (props.inverse ? "black" : "white")};
      cursor: pointer;
    }
  }
`;

export default ClickableBox;
