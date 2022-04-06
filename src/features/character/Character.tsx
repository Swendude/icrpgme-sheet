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

const CardBlock = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  gap: 2rem;
`;

const CardCol = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
        <CardBlock>
          <CardCol>
            <CardSpacer title="STATS" />
            <CardRow label="STR" value={character.innate.stats.str} />
            <CardRow label="DEX" value={character.innate.stats.dex} />
            <CardRow label="CON" value={character.innate.stats.con} />
            <CardRow label="WIS" value={character.innate.stats.wis} />
            <CardRow label="INT" value={character.innate.stats.int} />
            <CardRow label="CHA" value={character.innate.stats.cha} />
          </CardCol>
          <CardCol>
            <CardSpacer title="EFFORT" />
            <CardRow label="BASIC" value={character.innate.effort.basic} />
            <CardRow
              label="WEAPON"
              value={character.innate.effort.weapon_tools}
            />
            <CardRow label="SPECIAL" value={character.innate.effort.guns} />
            <CardRow
              label="MAGIC"
              value={character.innate.effort.energy_magic}
            />
            <CardRow
              label="ULTIMATE"
              value={character.innate.effort.ultimate}
            />
          </CardCol>
        </CardBlock>
      </CardBody>
    </CharacterCard>
  );
};
