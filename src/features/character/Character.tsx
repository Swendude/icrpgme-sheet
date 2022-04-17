import { useAppSelector } from "../../app/hooks";
import { selectCharacter } from "./characterSlice";
import TopBar from "./TopBar";
import styled from "styled-components";
import CardSpacer from "./CardSpacer";
import StatRow from "./StatRow";
import InfoRow from "./InfoRow";
import DefenseRow from "./DefenseRow";
import ItemRow from "./ItemRow";
const CharacterCard = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-areas:
    "topbar topbar"
    "defense info"
    "stats effort"
    "equipment equipment";
  gap: 0.5rem 1.5rem;
  color: white;
  background-color: ${(props) => `${props.theme.colors.background}`};
  border-radius: ${(props) =>
    `${props.theme.borderRadius} ${props.theme.borderRadius} 0 0`};
`;

interface CardBlockProps {
  readonly area: string;
}

const CardBlock = styled.div<CardBlockProps>`
  grid-area: ${(props) => props.area};
`;

export const Character = (props: { ix: number }) => {
  const character = useAppSelector(selectCharacter(props.ix));

  return (
    <CharacterCard className={`main-container`}>
      <CardBlock area="topbar">
        <TopBar
          name={character.name}
          lifeform={character.lifeform}
          type={character.type}
        ></TopBar>
      </CardBlock>
      <CardBlock area="defense">
        <CardSpacer title="DEFENSE" />
        <DefenseRow
          defense={character.calculatedAttrs.defense}
          armor={character.calculatedAttrs.armor}
        />
      </CardBlock>
      <CardBlock area="info">
        <CardSpacer title="INFO" />
        <InfoRow
          ix={props.ix}
          coin={character.coin}
          herocoin={character.hero_coin}
        />
      </CardBlock>

      <CardBlock area="stats">
        <CardSpacer title="STATS" />
        <StatRow
          label="STR"
          extra="D20"
          value={character.calculatedAttrs.final.stats.str}
        />
        <StatRow
          label="DEX"
          extra="D20"
          value={character.calculatedAttrs.final.stats.dex}
        />
        <StatRow
          label="CON"
          extra="D20"
          value={character.calculatedAttrs.final.stats.con}
        />
        <StatRow
          label="WIS"
          extra="D20"
          value={character.calculatedAttrs.final.stats.wis}
        />
        <StatRow
          label="INT"
          extra="D20"
          value={character.calculatedAttrs.final.stats.int}
        />
        <StatRow
          label="CHA"
          extra="D20"
          value={character.calculatedAttrs.final.stats.cha}
        />
      </CardBlock>
      <CardBlock area="effort">
        <CardSpacer title="EFFORT" />
        <StatRow
          label="BASIC"
          extra="D4"
          value={character.calculatedAttrs.final.effort.basic}
        />
        <StatRow
          label="WEAPON"
          extra="D6"
          value={character.calculatedAttrs.final.effort.weapon_tools}
        />
        <StatRow
          label="SPECIAL"
          extra="D8"
          value={character.calculatedAttrs.final.effort.guns}
        />
        <StatRow
          label="MAGIC"
          extra="D10"
          value={character.calculatedAttrs.final.effort.energy_magic}
        />
        <StatRow
          label="ULTIMATE"
          extra="D12"
          value={character.calculatedAttrs.final.effort.ultimate}
        />
      </CardBlock>
      <CardBlock area="equipment">
        <CardSpacer title="EQUIPMENT" />
        {character.items.map((item, ix) => (
          <ItemRow item={item} ix={ix} char_ix={props.ix} />
        ))}
      </CardBlock>
    </CharacterCard>
  );
};
