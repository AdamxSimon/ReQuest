// Custom Components

import CharacterCard from "../../../components/CharacterCard/CharacterCard";

// Interfaces

import { Character } from "../../../types/Character";

// Styles

import classes from "./styles.module.css";

const CharacterCards = (): JSX.Element => {
  const exampleCharacter: Character = {
    name: "Jimmy",
    health: 10,
    attack: 10,
    defense: 10,
    speed: 10,
    attributes: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    skills: ["Athletics", "Stealth"],
  };

  return (
    <>
      <div className={classes.cardContainer}>
        <CharacterCard character={exampleCharacter} />
      </div>
    </>
  );
};

export default CharacterCards;
