import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

// SECTION  Types

type toRoll = { state: "Not rolled" } | { state: "Rolled"; value: number };

export type CharacterHealth =
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
  ultimate: number;
}

export interface Attributes {
  stats: Stats;
  effort: Effort;
  hearts: number;
  stun: number;
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

const finalAttrs = (char: Character): Attributes =>
  [
    char.innate,
    ...char.abilities,
    ...char.items,
    ...char.augments,
    ...char.powers,
  ].reduce(addAttributes);

export const addAttributes = (fst: Attributes, snd: Attributes) => ({
  hearts: (fst.hearts || 0) + (snd.hearts || 0),
  stun: (fst.stun || 0) + (snd.stun || 0),
  stats: {
    str: (fst.stats.str || 0) + (snd.stats.str || 0),
    dex: (fst.stats.dex || 0) + (snd.stats.dex || 0),
    con: (fst.stats.con || 0) + (snd.stats.con || 0),
    int: (fst.stats.int || 0) + (snd.stats.int || 0),
    wis: (fst.stats.wis || 0) + (snd.stats.wis || 0),
    cha: (fst.stats.cha || 0) + (snd.stats.cha || 0),
    def: (fst.stats.def || 0) + (snd.stats.def || 0),
  },
  effort: {
    basic: (fst.effort.basic || 0) + (snd.effort.basic || 0),
    weapon_tools:
      (fst.effort.weapon_tools || 0) + (snd.effort.weapon_tools || 0),
    guns: (fst.effort.guns || 0) + (snd.effort.guns || 0),
    energy_magic:
      (fst.effort.energy_magic || 0) + (snd.effort.energy_magic || 0),
    ultimate: (fst.effort.ultimate || 0) + (snd.effort.ultimate || 0),
  },
});

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

export function emptyAttrs(): Attributes {
  return {
    hearts: 0,
    stun: 0,
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
      ultimate: 0,
    },
  };
}

export function createAttrs(
  subAttrs: Partial<{
    stats: Partial<Stats>;
    effort: Partial<Effort>;
    hearts: number;
    stun: number;
  }>
): Attributes {
  return {
    stats: { ...emptyAttrs().stats, ...subAttrs.stats },
    effort: { ...emptyAttrs().effort, ...subAttrs.effort },
    hearts: subAttrs.hearts || emptyAttrs().hearts,
    stun: subAttrs.stun || emptyAttrs().stun,
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
    hitpoints: { state: "Not Dying", hitpoints: 20 },
    stunpoints: 20,
    hero_coin: false,
    coin: 0,
    innate: createAttrs({
      stats: { str: 7, dex: 1, con: 2 },
      effort: { basic: 1, weapon_tools: 3 },
      hearts: 1,
      stun: 1,
    }),
    items: [
      {
        name: "Orcrist",
        description: "ELVEN, SLICING, MASTERCRAFT",
        equipped: false,
        ...createAttrs({ stats: { str: 2 }, effort: { weapon_tools: 3 } }),
      },
      {
        name: "Oak shield",
        description: "IMPROVISED, MASSIVE, TOUGH",
        equipped: true,
        ...createAttrs({ stats: { def: 4 } }),
      },
      {
        name: "Heart Stone",
        description: "EXTRA LIFE",
        equipped: true,
        ...createAttrs({ hearts: 1 }),
      },
      {
        name: "Mana Stone",
        description: "EXTRA POWER",
        equipped: true,
        ...createAttrs({ stun: 1 }),
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
    changeStunpoints(
      state,
      action: PayloadAction<{ char_ix: number; change: number }>
    ) {
      const char_sp = state[action.payload.char_ix].stunpoints;
      const new_sp = char_sp + action.payload.change;
      switch (new_sp > 0) {
        case true:
          state[action.payload.char_ix].stunpoints = new_sp;
          return state;
        default:
          state[action.payload.char_ix].stunpoints = 0;
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

export const {
  updateInnate,
  changeHitpoints,
  switchHeroCoin,
  changeCoin,
  changeStunpoints,
} = characterSlice.actions;

export const selectCoin = (ix: number) => (state: RootState) =>
  state.characters[ix].coin;
export const selectCharacter = (ix: number) => (state: RootState) => ({
  ...state.characters[ix],
  calculatedAttrs: {
    defense:
      state.characters[ix].innate.stats.con +
      finalAttrs(state.characters[ix]).stats.def,
    armor:
      state.characters[ix].innate.stats.con +
      finalAttrs(state.characters[ix]).stats.def +
      10,
    final: finalAttrs(state.characters[ix]),
  },
});

export default characterSlice.reducer;

// !SECTION
