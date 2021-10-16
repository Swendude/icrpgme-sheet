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
} from "./characterSlice";

export const Character = (props: { ix: number }) => {
  const editHpContainer = useRef(null);
  const character = useAppSelector(selectCharacter(props.ix));
  const [editHp, setEditHp] = useState(false);
  useClickOutsideContainer(editHpContainer, () => setEditHp(false));

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
          {editHp && <HpMenu ix={props.ix} ref={editHpContainer} />}
        </div>
      </div>

      <ColBlock title={"STORY"} collapse={true}>
        <p>{character.story}</p>
      </ColBlock>

      <ColBlock title={"STATS"} collapse={false}>
        {Object.entries(character.innate.stats)
          .filter((k) => k[1] !== 0)
          .map((k, i) => {
            return (
              <StatRow key={i} statName={k[0]} value={k[1]} diceDescr={"D20"} />
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
                diceDescr={["D4", "D6", "D8", "D10", "D12"][i]}
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

function StatRow(props: {
  statName: string;
  value: number;
  diceDescr: string;
}) {
  return (
    <div className='flex items-center justify-between pl-2 pr-5 odd:bg-gray-200'>
      <div className=' pr-2 font-bold text-lg items-center'>
        <div className='flex items-end'>
          <p>{props.statName.toUpperCase()}</p>
          <p className='font-light text-xs text-black text-opacity-40'>
            {props.diceDescr}
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

const HpMenu = React.forwardRef((props: { ix: number }, ref: any) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className='absolute right-0 flex-col border-2 border-black bg-white rounded text-black text-xs w-full'
      ref={ref}
    >
      {[-10, -5, -1, 1, 5, 10].map((val) => (
        <button
          className='flex w-full pt-2 pb-2 justify-center hover:bg-black hover:bg-opacity-40 active:bg-black active:bg-opacity-100 active:text-white'
          onClick={() =>
            dispatch(
              changeHitpoints({
                char_ix: props.ix,
                hitpoints_change: val,
              })
            )
          }
        >
          {val > 0 ? `+${val}` : val}{" "}
        </button>
      ))}
    </div>
  );
});
