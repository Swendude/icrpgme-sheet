import { PayloadAction } from "@reduxjs/toolkit";
import { ReactChild, ReactFragment, ReactNode } from "react";
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
import SheetHeader from "./TopBar";
import styled from "styled-components";
import HitPointCounter from "./HitPointCounter";
import NumberOptionsMenu from "./NumberOptionsMenu";
import StunPointCounter from "./StunPointCounter";
import DefenseCounter from "./DefenseCounter";
import HeroCoinToggle from "./HeroCoinToggle";

const CharacterSheet = styled.div`
  margin: 2% 10% 0 10%;
  display: flex;
  flex-direction: column;
  padding: 0px;
  background-color: ${(props) => `${props.theme.colors.background}`};
  border-radius: ${(props) =>
    `${props.theme.borderRadius} ${props.theme.borderRadius} 0 0`};
`;

const SheetBody = styled.div`
  border: solid;
  display: flex;
  align-items: stretch;
  border-width: ${(props) => props.theme.borderWidth};
  border-color: black;
  flex-grow: 1;
  padding: 0.3em;
  word-break: break-all;
  flex-wrap: wrap;
  gap: 2%;
  row-gap: 0.6em;
`;

const Block = styled.div<{ small?: Boolean }>`
  background-color: ${(props) => props.theme.colors.main};
  flex: 1 1 23%;
  ${(props) => (props.small ? "flex: 1 1 13%;" : "flex: 1 1 23%;")}
  display: flex;
  flex-direction: column;
`;

const BlockHeader = styled.h2`
  font-weight: bold;
  font-size: 0.7em;
  padding: 0.3em;
  background-color: black;
  color: ${({ theme }) => theme.colors.background};
  width: auto;
  margin: 0;
`;

const BlockBody = styled.div`
  width: 100%;
  padding: 0.3em;
`;

const SheetBlock = (props: {
  title: string;
  children?: ReactChild;
  small?: Boolean;
}) => {
  return (
    <Block small={props.small}>
      <BlockHeader>{props.title}</BlockHeader>
      <BlockBody>{props.children}</BlockBody>
    </Block>
  );
};

export const Character = (props: { ix: number }) => {
  const character = useAppSelector(selectCharacter(props.ix));

  return (
    <CharacterSheet>
      <SheetHeader
        name={character.name}
        lifeform={character.lifeform}
        type={character.type}
      ></SheetHeader>
      <SheetBody>
        <SheetBlock title="HITPOINTS">10/10</SheetBlock>
        <SheetBlock title="STUNPOINTS">10/10</SheetBlock>
        <SheetBlock title="ARMOR">16</SheetBlock>
        <SheetBlock title="COIN">100</SheetBlock>
        <SheetBlock title="STR" small={true}>
          1
        </SheetBlock>
        <SheetBlock title="DEX" small={true}>
          4
        </SheetBlock>
        <SheetBlock title="CON" small={true}>
          4
        </SheetBlock>
        <SheetBlock title="WIS" small={true}>
          2
        </SheetBlock>
        <SheetBlock title="INT" small={true}>
          0
        </SheetBlock>
        <SheetBlock title="CHA" small={true}>
          2
        </SheetBlock>
        <SheetBlock title="BASIC" small={true}>
          1
        </SheetBlock>
        <SheetBlock title="WEAPON" small={true}>
          4
        </SheetBlock>
        <SheetBlock title="SPECIAL" small={true}>
          4
        </SheetBlock>
        <SheetBlock title="MAGIC" small={true}>
          2
        </SheetBlock>
        <SheetBlock title="ULTIMATE" small={true}>
          0
        </SheetBlock>
      </SheetBody>
    </CharacterSheet>
  );
};
