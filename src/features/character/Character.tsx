// import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  decrement,
  increment,  
  selectCharacter
} from "./characterSlice";

import styles from './character.module.css'

export function Character() {
  const character = useAppSelector(selectCharacter);
  const dispatch = useAppDispatch();
  
  return (
    <div className={styles.box_style}>
      <div>
        <div>
          <p>Name:{character.name || "NO NAME"}</p>
        </div>
      </div>
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
