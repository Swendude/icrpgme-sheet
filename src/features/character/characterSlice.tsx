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

const initialState: Character[] = [
  {
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
  },
  {
    name: "Arwen Undómiel",
    lifeform: "Elf",
    type: "Mage",
    story:
      "Arwen was born in TA 241, to Lord Elrond and Lady Celebrían of Rivendell. Like her father and brothers, she had the right to choose between immortality or mortal life.",
    hearts: 1,
    hitpoints: { state: "Not Dying", hitpoints: 10 },
    stunpoints: 10,
    hero_coin: false,
    coin: 0,
    innate: {
      stats: {
        str: 1,
        dex: 3,
        con: 0,
        int: 4,
        wis: 1,
        cha: 0,
      },
      effort: {
        basic: 0,
        weapon_tools: 3,
        guns: 0,
        energy_magic: 4,
      },
    },
    items: [],
    abilities: [],
    powers: [],
    augments: [],
    notes: [],
  },
  {
    name: "Aragorn II Elessar",
    lifeform: "Human",
    type: "Ranger",
    story:
      "Aragorn was a descendant of Elros Tar-Minyatur through the line of the Lords of Andúnië to Elendil, High King of Arnor and Gondor.",
    hearts: 1,
    hitpoints: { state: "Not Dying", hitpoints: 10 },
    stunpoints: 10,
    hero_coin: false,
    coin: 0,
    innate: {
      stats: {
        str: 2,
        dex: 3,
        con: 1,
        int: 0,
        wis: 1,
        cha: 4,
      },
      effort: {
        basic: 3,
        weapon_tools: 6,
        guns: 0,
        energy_magic: 2,
      },
    },
    items: [],
    abilities: [],
    powers: [],
    augments: [],
    notes: [],
  },
];

export const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
});

export const {} = characterSlice.actions;

export const selectCoin = (ix: number) => (state: RootState) =>
  state.characters[ix].coin;
export const selectCharacter = (ix: number) => (state: RootState) =>
  state.characters[ix];

export default characterSlice.reducer;
