import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

// SECTION  Types

type toRoll = { state: "Not rolled" } | { state: "Rolled"; value: number };

type CharacterHealth =
  | { state: "Not Dying"; hitpoints: number }
  | { state: "Dying"; counter: toRoll }
  | { state: "Dead" };

interface Stats {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  def: number;
}

interface Effort {
  basic: number;
  weapon_tools: number;
  guns: number;
  energy_magic: number;
}

interface Attributes {
  stats: Stats;
  effort: Effort;
}

export interface Item extends Attributes {
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

// !SECTION
// SECTION  Utilities & helper functions

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

function emptyAttrs(): Attributes {
  return {
    stats: {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
      def: 0,
    },
    effort: {
      basic: 0,
      weapon_tools: 0,
      guns: 0,
      energy_magic: 0,
    },
  };
}

export function createAttrs(
  subAttrs: Partial<{ stats: Partial<Stats>; effort: Partial<Effort> }>
): Attributes {
  return {
    stats: { ...emptyAttrs().stats, ...subAttrs.stats },
    effort: { ...emptyAttrs().effort, ...subAttrs.effort },
  };
}

// !SECTION
// SECTION Reducer slice

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
    innate: createAttrs({
      stats: { str: 17, dex: 11, con: 2 },
      effort: { basic: 1, weapon_tools: 3 },
    }),
    items: [
      {
        name: "Orcrist",
        description: "ELVEN, SLICING, MASTERCRAFT",
        equipped: true,
        ...createAttrs({ stats: { str: 2 }, effort: { weapon_tools: 3 } }),
      },
      {
        name: "Oak shield",
        description: "IMPROVISED, MASSIVE, TOUGH",
        equipped: true,
        ...createAttrs({ stats: { def: 4 } }),
      },
    ],
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
    innate: createAttrs({
      stats: {
        str: 1,
        dex: 3,
        int: 4,
        wis: 1,
      },
      effort: {
        weapon_tools: 3,
        energy_magic: 4,
      },
    }),
    items: [
      {
        name: "Horse River",
        description: "INT spell: speak in Quenya and summon the water horses",
        equipped: true,
        ...createAttrs({}),
      },
      {
        name: "Hadhafang",
        description: "ELVEN, SLICING, MASTERCRAFT, MAGICAL",
        equipped: true,
        ...createAttrs({ effort: { weapon_tools: 4 } }),
      },
    ],
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
    innate: createAttrs({
      stats: {
        str: 2,
        dex: 3,
        con: 1,
        wis: 1,
        cha: 4,
      },
      effort: {
        basic: 3,
        weapon_tools: 6,
        energy_magic: 2,
      },
    }),
    items: [
      {
        name: "Andúril, Flame of the West",
        description: "REFORGED, SHARP, LONG, LEADER",
        equipped: true,
        ...createAttrs({
          stats: { str: 2, cha: 3 },
          effort: { weapon_tools: 4, basic: 2 },
        }),
      },
      {
        name: "Evenstar",
        description: "Magical charm",
        equipped: true,
        ...createAttrs({
          stats: { int: 2 },
        }),
      },
      {
        name: "Ring of Barahir",
        description:
          "An ancient ring that once belonged to the Elven Lord Finrod. It's wearer ages slower.",
        equipped: true,
        ...createAttrs({
          stats: { wis: 8 },
          effort: { energy_magic: 6 },
        }),
      },
    ],
    abilities: [],
    powers: [],
    augments: [],
    notes: [],
  },
];

// !SECTION

// SECTION Exports

export const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    changeHitpoints(
      state,
      action: PayloadAction<{ char_ix: number; change: number }>
    ) {
      const char_hp = state[action.payload.char_ix].hitpoints;
      switch (char_hp.state) {
        case "Not Dying":
          var new_hp = char_hp.hitpoints + action.payload.change;
          if (new_hp < 0) {
            new_hp = 0;
          }
          state[action.payload.char_ix].hitpoints = {
            ...char_hp,
            hitpoints: new_hp,
          };
          return state;

        case "Dying":
          return state;
        case "Dead":
          return state;
        default:
          return state;
      }
    },
    changeCoin(
      state,
      action: PayloadAction<{ char_ix: number; change: number }>
    ) {
      state[action.payload.char_ix].coin += action.payload.change;
    },
    switchHeroCoin(state, action: PayloadAction<{ char_ix: number }>) {
      state[action.payload.char_ix].hero_coin =
        !state[action.payload.char_ix].hero_coin;
    },
    updateInnate(
      state,
      action: PayloadAction<{ char_ix: number; new_innate: Attributes }>
    ) {
      state[action.payload.char_ix].innate = action.payload.new_innate;
    },
  },
});

export const { updateInnate, changeHitpoints, switchHeroCoin, changeCoin } =
  characterSlice.actions;

export const selectCoin = (ix: number) => (state: RootState) =>
  state.characters[ix].coin;
export const selectCharacter = (ix: number) => (state: RootState) => ({
  ...state.characters[ix],
  calculatedAttrs: {
    armor: state.characters[ix].innate.stats.con + 10,
  },
});

export default characterSlice.reducer;

// !SECTION
