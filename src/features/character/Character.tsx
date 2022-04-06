import { PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import React, { useState, useRef } from "react";
import {
  useAppSelector,
  useAppDispatch,
  useClickOutsideContainer,
} from "../../app/hooks";
import {
  selectCharacter,
  characterHealthToView,
  changeHitpoints,
  switchHeroCoin,
  changeCoin,
  Item,
  changeStunpoints,
} from "./characterSlice";
import { Stats } from "fs";
import TopBar from "./TopBar";
import styled from "styled-components";
import CardSpacer from "./CardSpacer";
import CardRow from "./CardRow";

const CharacterCard = styled.div`
  margin: 4% 20%;
  display: flex;
  flex-direction: column;
  padding: 0px;
  color: white;
  background-color: ${(props) => `${props.theme.colors.background}`};
  border-radius: ${(props) =>
    `${props.theme.borderRadius} ${props.theme.borderRadius} 0 0`};
`;

const CardBody = styled.div`
  border: solid;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-width: ${(props) => props.theme.borderWidth};
  border-color: black;
  flex-grow: 1;
  padding: 0 0.7rem;
`;

export const Character = (props: { ix: number }) => {
  const character = useAppSelector(selectCharacter(props.ix));

  return (
    <CharacterCard>
      <TopBar
        name={character.name}
        lifeform={character.lifeform}
        type={character.type}
      ></TopBar>
      <CardBody>
        <CardSpacer title="info" />
        <CardRow label="STR" />
        <CardRow label="CHA" />
      </CardBody>
    </CharacterCard>
  );
};
