import React, { useState } from "react";

import { useAppSelector } from "../../app/hooks";
import { selectCharacter, characterHealthToView } from "./characterSlice";

export function Character(props: { ix: number }) {
  const character = useAppSelector(selectCharacter(props.ix));

  const [showStory, setShowStory] = useState(false);

  return (
    <div className='font-mono flex-col flex-grow-0 bg-white border-2 border-black rounded w-80 max-w-xs'>
      <div className='flex items-center justify-between pb-2 pl-2 pr-2 text-white bg-black'>
        <div id='info' className='flex flex-col '>
          <div className='text-lg font-bold '>{character.name}</div>
          <div className='text-sm font-light text-white text-opacity-40'>
            {character.lifeform} - {character.type}
          </div>
        </div>
        <div id='hitpoints' className='items-center text-xs'>
          <div className='flex p-1 border border-white rounded'>
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
        </div>
      </div>
      <div id='story' className='flex flex-col p-2'>
        <div className='flex items-center'>
          <h2 className='text-xs font-bold text-black text-opacity-40'>
            STORY
          </h2>
          <div className='flex-grow ml-2 mr-2 border-b border-black border-opacity-40'></div>
          <button
            onClick={() => setShowStory(!showStory)}
            className='text-xs font-bold text-black text-opacity-40'
          >
            {showStory ? "▼" : "◀"}
          </button>
        </div>
        {showStory && <p>{character.story}</p>}
      </div>
      <div id='stats' className='flex flex-col p-2'>
        <div className='flex items-center'>
          <h2 className='text-xs font-bold text-black text-opacity-40'>
            STATS
          </h2>
          <div className='flex-grow ml-2 mr-2 border-b border-black border-opacity-40'></div>
          <div className='text-xs font-bold text-black text-opacity-0'>◀</div>
        </div>
        <div className='flex-col  flex-grow'>
          {Object.entries(character.innate.stats)
            .filter((k) => k[1] != 0)
            .map((k) => {
              return <StatRow statName={k[0]} value={k[1]} diceDescr={"D20"} />;
            })}
        </div>
      </div>
      <div id='effort' className='flex flex-col p-2'>
        <div className='flex items-center'>
          <h2 className='text-xs font-bold text-black text-opacity-40'>
            EFFORT
          </h2>
          <div className='flex-grow ml-2 mr-2 border-b border-black border-opacity-40'></div>
          <div className='text-xs font-bold text-black text-opacity-0'>◀</div>
        </div>
        <div className='flex-col  flex-grow'>
          {Object.entries(character.innate.effort)
            .filter((k) => k[1] != 0)
            .map((k, i) => {
              return (
                <StatRow
                  statName={k[0].replace("_", " & ")}
                  value={k[1]}
                  diceDescr={["D4", "D6", "D8", "D10", "D12"][i]}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

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
