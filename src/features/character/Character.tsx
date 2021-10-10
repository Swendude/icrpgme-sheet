import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { decrement, increment, selectCharacter } from "./characterSlice";

type TextPropProps = {
  label: string;
  value: string;
};

function TextProp(props: TextPropProps) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="pl-2 border-2 border-black">
      <p className="text-xs text-black text-opacity-40">{props.label}</p>
      {!editing ? (
        <div onClick={() => setEditing(!editing)}>
          <p>{props.value || `Please enter ${props.label}`}</p>
        </div>
      ) : (
        <input
          value={props.value || `Please enter ${props.label}`}
          type="text"
        ></input>
      )}
    </div>
  );
}

export function Character() {
  const character = useAppSelector(selectCharacter);
  const dispatch = useAppDispatch();

  return (
    <div className=" m-4 max-w-sm mx-auto bg-white rounded shadow-md border-4 border-black">
      <TextProp label="Name" value={character.name} />
      <TextProp label="Type" value={character.type} />
      <TextProp label="Lifeform" value={character.lifeform} />
      <TextProp label="Story" value={character.story} />

      <div>
        <div>
          <p>Coin:</p>
        </div>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span>{character.coin}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
    </div>
  );
}
