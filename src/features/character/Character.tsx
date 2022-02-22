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
import HitPointCounter from "./HitPointCounter";
import NumberOptionsMenu from "./NumberOptionsMenu";
import StunPointCounter from "./StunPointCounter";
import DefenseCounter from "./DefenseCounter";
import HeroCoinToggle from "./HeroCoinToggle";
const CharacterCard = styled.div`
  margin: 32px 122px 0px 122px;
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

  /* border-top: 0px; */
`;

const CounterRow = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CounterBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-evenl; */
`;

const CounterName = styled.h3`
  color: black;
  text-align: center;
  margin: 0.5em;
`;

const RowSplit = styled.div`
  border-left: solid 3px black;
  margin: 0.5em 0.3em 0.5em 0.3em;
`;

const Description = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  color: black;
  font-weight: normal;
  font-size: 1em;
  flex-grow: 1;
`;

export const Character = (props: { ix: number }) => {
  // const dispatch = useAppDispatch();
  const character = useAppSelector(selectCharacter(props.ix));

  return (
    <CharacterCard>
      <TopBar
        name={character.name}
        lifeform={character.lifeform}
        type={character.type}
      ></TopBar>
      <CardBody>
        <CounterRow>
          <CounterBlock>
            <CounterName>HITPOINTS</CounterName>
            <HitPointCounter
              hitpoints={character.hitpoints}
              total={character.calculatedAttrs.final.hearts}
            />
            <NumberOptionsMenu
              dispatchAction={(val) =>
                changeHitpoints({ char_ix: props.ix, change: val })
              }
              scale={[-5, -1, 1, 5]}
            />
          </CounterBlock>
          <RowSplit />
          <CounterBlock>
            <CounterName>STUNPOINTS</CounterName>
            <StunPointCounter
              stunpoints={character.stunpoints}
              total={character.calculatedAttrs.final.stun}
            />
            <NumberOptionsMenu
              dispatchAction={(val) =>
                changeStunpoints({ char_ix: props.ix, change: val })
              }
              scale={[-5, -1, 1, 5]}
            />
          </CounterBlock>
          <RowSplit />
          <CounterBlock>
            <CounterName>DEFENSE</CounterName>
            <DefenseCounter defense={character.calculatedAttrs.defense} />
            <Description>
              <span>CON+DEF+10</span>
            </Description>
          </CounterBlock>
          <RowSplit />
          <CounterBlock>
            <CounterName>HERO COIN</CounterName>
            <HeroCoinToggle
              coin={character.hero_coin}
              dispatchAction={switchHeroCoin({ char_ix: props.ix })}
            />
            <Description>
              <span>REROLL ANYTHING</span>
            </Description>
          </CounterBlock>
        </CounterRow>

        {/* <ColBlock title={"STORY"} collapse={true}>
          <p>{character.story}</p>
        </ColBlock> */}

        {/* <ColBlock title={"INFO"} collapse={false}>
          <InfoRow infoName={"Armor"} descr={"10+CON+DEF"}>
            <div>
              <p>{character.calculatedAttrs.armor}</p>
            </div>
          </InfoRow>
          <InfoRow infoName={"HERO COIN"} descr={"REROLL ANYTHING"}>
            <button
              aria-pressed={character.hero_coin}
              className={
                character.hero_coin
                  ? "rounded-xl bg-black border-black border-2 w-4 h-4"
                  : "rounded-xl bg-white border-black border-2 w-4 h-4"
              }
              onClick={() => dispatch(switchHeroCoin({ char_ix: props.ix }))}
            ></button>
          </InfoRow>
          <InfoRow infoName={"COIN"} descr={"LOOT!"}>
            <div>
              <button onClick={() => setEditCoin(!editCoin)}>
                {character.coin}
              </button>
              {editCoin && (
                <DdNumberMenu
                  scale={[1000, 100, 10, 1, -1, -10, -100, -1000]}
                  dispatchAction={(val) =>
                    changeCoin({ char_ix: props.ix, change: val })
                  }
                  ref={editCoinContainer}
                ></DdNumberMenu>
              )}
            </div>
          </InfoRow>
        </ColBlock>

        <ColBlock title={"STATS"} collapse={false}>
          {Object.entries(character.innate.stats)
            .filter((k) => k[1] !== 0)
            .map((k, i) => {
              return (
                <StatRow key={i} statName={k[0]} value={k[1]} descr={"D20"} />
              );
            })}
        </ColBlock>

        <ColBlock title={"EFFORT"} collapse={false}>
          {Object.entries(character.innate.effort)
            .filter((k) => k[1] !== 0)
            .map((k, i) => {
              return (
                <StatRow
                  key={i}
                  statName={k[0].replace("_", " & ")}
                  value={k[1]}
                  descr={["D4", "D6", "D8", "D10", "D12"][i]}
                />
              );
            })}
        </ColBlock>
        <ColBlock title={"ITEMS"} collapse={false}>
          {character.items.map((item, i) => {
            return <ItemRow item={item} key={i} />;
          })}
        </ColBlock> */}
      </CardBody>
    </CharacterCard>
  );
};

const ColBlock = (props: {
  title: string;
  collapse: boolean;
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [show, setShow] = useState(false);

  return (
    <div id={props.title}>
      <div>
        <div></div>
        <h2>{props.title}</h2>
        <div></div>
        {props.collapse ? (
          <button onClick={() => setShow(!show)}>{show ? "▼" : "◀"}</button>
        ) : (
          <div>◀</div>
        )}
      </div>
      <div>{props.collapse ? show && props.children : props.children}</div>
    </div>
  );
};

function StatRow(props: { statName: string; value: number; descr: string }) {
  return (
    <div>
      <div>
        <div>
          <p>{props.statName.toUpperCase()}</p>
          <p>{props.descr}</p>
        </div>
      </div>
      <div>
        <p>+</p>
        <p>{props.value}</p>
      </div>
    </div>
  );
}

function InfoRow(props: {
  infoName: string;
  descr: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div>
        <div>
          <p>{props.infoName.toUpperCase()}</p>
          <p>{props.descr}</p>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

function ItemRow(props: { item: Item }) {
  return (
    <div>
      <div>
        <p>{props.item.name.toUpperCase()}</p>
        {Object.entries(props.item.stats)
          .filter((p) => p[1] > 0)
          .map((stat) => (
            <p>
              {stat[0].toUpperCase()} {stat[1]}
            </p>
          ))}
      </div>
      <div>
        <p>{props.item.description}</p>
      </div>
      <div></div>
    </div>
  );
}
