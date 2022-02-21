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
} from "./characterSlice";
import { Stats } from "fs";

export const Character = (props: { ix: number }) => {
  const dispatch = useAppDispatch();
  const editHpContainer = useRef(null);
  const editCoinContainer = useRef(null);
  const character = useAppSelector(selectCharacter(props.ix));
  const [editHp, setEditHp] = useState(false);
  const [editCoin, setEditCoin] = useState(false);
  useClickOutsideContainer(editHpContainer, () => setEditHp(false));
  useClickOutsideContainer(editCoinContainer, () => setEditCoin(false));

  return (
    <div>
      <div>
        <div>
          <div>{character.name}</div>
          <div>
            {character.lifeform} - {character.type}
          </div>
        </div>
        <div>
          <button id="hitpoints" onClick={() => setEditHp(!editHp)}>
            <div>
              <div>
                <p>
                  {characterHealthToView(character.hitpoints)}/
                  {character.hearts * 10}
                </p>
              </div>
              <div>
                <p>HP</p>
              </div>
            </div>
          </button>
          {editHp && (
            <DdNumberMenu
              dispatchAction={(val) =>
                changeHitpoints({ char_ix: props.ix, change: val })
              }
              scale={[-10, -5, -1, 1, 5, 10]}
              ref={editHpContainer}
            />
          )}
        </div>
      </div>

      <ColBlock title={"STORY"} collapse={true}>
        <p>{character.story}</p>
      </ColBlock>

      <ColBlock title={"INFO"} collapse={false}>
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
      </ColBlock>
    </div>
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

const DdNumberMenu = React.forwardRef(
  (
    props: {
      scale: number[];
      dispatchAction: (
        change: number
      ) => PayloadAction<{ char_ix: number; change: number }>;
    },
    ref: any
  ) => {
    const dispatch = useAppDispatch();

    return (
      <div ref={ref}>
        <div>▲</div>
        {props.scale.map((val, i) => (
          <button key={i} onClick={() => dispatch(props.dispatchAction(val))}>
            {val > 0 ? `+${val}` : val}{" "}
          </button>
        ))}
      </div>
    );
  }
);
