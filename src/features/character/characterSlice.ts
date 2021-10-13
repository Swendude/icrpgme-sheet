import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type toRoll = { state: "Not rolled" } | { state: "Rolled"; value: number };

export function characterHealthToView(char_health: CharacterHealth): string {
  switch (char_health.state) {
    case "Not Dying":
      return char_health.hitpoints.toString();
    case "Dying":
      return "X";
    case "Dead":
      return "X";
  }
}

type CharacterHealth =
  | { state: "Not Dying"; hitpoints: number }
  | { state: "Dying"; counter: toRoll }
  | { state: "Dead" };

interface Attributes {
  stats: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  effort: {
    basic: number;
    weapon_tools: number;
    guns: number;
    energy_magic: number;
  };
}

interface Item extends Attributes {
  name: string;
  description: string;
  equipped: boolean;
}

interface Ability extends Attributes {
  name: string;
  description: string;
}

interface Power extends Attributes {
  name: string;
  description: string;
}

interface Augment extends Attributes {
  name: string;
  description: string;
}

export type Character = {
  name: string;
  lifeform: string;
  type: string;
  story: string;
  hearts: number;
  hitpoints: CharacterHealth;
  stunpoints: number;
  hero_coin: boolean;
  coin: number;
  innate: Attributes;
  items: Item[];
  abilities: Ability[];
  powers: Power[];
  augments: Augment[];
  notes: string[];
};

const initialState: Character = {
  name: "Thorin Oakenshield",
  lifeform: "Dwarf",
  type: "Warrior",
  story:
    "Thorin II was born in TA 2746 to Dwarven prince Thráin II in the city of The Lonely Mountain.",
  hearts: 1,
  hitpoints: { state: "Not Dying", hitpoints: 10 },
  stunpoints: 10,
  hero_coin: false,
  coin: 0,
  innate: {
    stats: {
      str: 5,
      dex: 1,
      con: 2,
      int: 0,
      wis: 0,
      cha: 0,
    },
    effort: {
      basic: 1,
      weapon_tools: 3,
      guns: 0,
      energy_magic: 0,
    },
  },
  items: [],
  abilities: [],
  powers: [],
  augments: [],
  notes: [],
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    increment: (state) => {
      state.coin += 1;
    },
    decrement: (state) => {
      state.coin -= 1;
    },
  },
});

export const { increment, decrement } = characterSlice.actions;

export const selectCoin = (state: RootState) => state.character.coin;
export const selectCharacter = (state: RootState) => state.character;

export default characterSlice.reducer;
