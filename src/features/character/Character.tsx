import { PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "hoist-non-react-statics/node_modules/@types/react";
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
} from "./characterSlice";

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
    <div className='font-mono flex-col flex-grow-0 bg-white border-2 border-black rounded w-80 max-w-xs'>
      <div className='flex items-center justify-between pb-2 pl-2 pr-2 text-white bg-black'>
        <div id='info' className='flex flex-col '>
          <div className='text-lg font-bold '>{character.name}</div>
          <div className='text-sm font-light text-white text-opacity-40'>
            {character.lifeform} - {character.type}
          </div>
        </div>
        <div className='relative'>
          <button
            id='hitpoints'
            className='items-center text-xs  bg-black'
            onClick={() => setEditHp(!editHp)}
          >
            <div className='flex p-1 border border-white rounded w-16 justify-center'>
              <div>
                <p>
                  {characterHealthToView(character.hitpoints)}/
                  {character.hearts * 10}
                </p>
              </div>
              <div className='pl-1'>
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
        <InfoRow statName={"DEFENSE"} descr={"10+CON+DEF"}>
          <div className='rounded-b-xl border border-black p-1 mt-1 mb-1'>
            <p className='font-bold text-l'>
              {10 + character.innate.stats.con}
            </p>
          </div>
        </InfoRow>
        <InfoRow statName={"HERO COIN"} descr={"REROLL ANYTHING"}>
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
        <InfoRow statName={"COIN"} descr={"LOOT!"}>
          <div className='relative'>
            <button
              onClick={() => setEditCoin(!editCoin)}
              className='font-bold text-l'
            >
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
    <div id={props.title} className='flex flex-col p-2'>
      <div className='flex items-center'>
        <h2 className='text-xs font-bold text-black text-opacity-40'>
          {props.title}
        </h2>
        <div className='flex-grow ml-2 mr-2 border-b border-black border-opacity-40'></div>
        {props.collapse ? (
          <button
            onClick={() => setShow(!show)}
            className='text-xs font-bold text-black text-opacity-40'
          >
            {show ? "▼" : "◀"}
          </button>
        ) : (
          <div className='text-xs font-bold text-black text-opacity-0'>◀</div>
        )}
      </div>
      <div className='flex-col flex-grow'>
        {props.collapse ? show && props.children : props.children}
      </div>
    </div>
  );
};

function StatRow(props: { statName: string; value: number; descr: string }) {
  return (
    <div className='flex items-center justify-between pl-2 pr-5 odd:bg-gray-200'>
      <div className=' pr-2 font-bold text-lg items-center'>
        <div className='flex items-end'>
          <p>{props.statName.toUpperCase()}</p>
          <p className='font-light text-xs text-black text-opacity-40'>
            {props.descr}
          </p>
        </div>
      </div>
      <div className='flex items-center'>
        <p className='pr-2 font-light text-xs text-black text-opacity-40'>+</p>
        <p className='font-bold text-l'>{props.value}</p>
      </div>
    </div>
  );
}

function InfoRow(props: {
  statName: string;
  descr: string;
  children: ReactNode;
}) {
  return (
    <div className='flex items-center justify-between pl-2 pr-5 odd:bg-gray-200'>
      <div className=' pr-2 font-bold text-lg items-center'>
        <div className='flex items-end'>
          <p>{props.statName.toUpperCase()}</p>
          <p className='font-light text-xs text-black text-opacity-40'>
            {props.descr}
          </p>
        </div>
      </div>
      <div className='flex items-center'>{props.children}</div>
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
      <div
        className='absolute right-0 flex-col border-2 border-black bg-white rounded text-black text-xs w-16 z-50'
        ref={ref}
      >
        <div className='flex w-full text-xs text-opacity-40 bg-gray-200 text-black  justify-center'>
          ▲
        </div>
        {props.scale.map((val, i) => (
          <button
            key={i}
            className='flex w-full pt-4 pb-4 justify-center odd:bg-gray-200 hover:bg-black hover:bg-opacity-40 active:bg-black active:bg-opacity-100 active:text-white'
            onClick={() => dispatch(props.dispatchAction(val))}
          >
            {val > 0 ? `+${val}` : val}{" "}
          </button>
        ))}
      </div>
    );
  }
);
