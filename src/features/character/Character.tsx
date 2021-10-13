import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  decrement,
  increment,
  selectCharacter,
  characterHealthToView,
} from "./characterSlice";

export function Character() {
  const character = useAppSelector(selectCharacter);
  const dispatch = useAppDispatch();

  const [showStory, setShowStory] = useState(true);

  return (
    <div className='flex flex-col bg-white border-2 border-black rounded shadow-md w-80'>
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
            Story
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
            Stats
          </h2>
          <div className='flex-grow ml-2 mr-2 border-b border-black border-opacity-40'></div>
          <div className='text-xs font-bold text-black text-opacity-0'>◀</div>
        </div>
        stats
      </div>
    </div>
  );
}
