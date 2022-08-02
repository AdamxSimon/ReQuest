// React

import { useContext } from "react";

// Context

import { CharactersContext } from "../../context/CharactersContext";
import { CharactersToolContext } from "../../context/CharactersToolContext";

// Custom Components

import CharacterCard from "../CharacterCard/CharacterCard";

// Styles

import classes from "./styles.module.css";

const CharacterCards = (): JSX.Element => {
  const { setCharacterBeingEdited } = useContext(CharactersToolContext);
  const { characters } = useContext(CharactersContext);

  return (
    <div className={classes.cardContainer}>
      {characters?.map((character, index) => {
        return (
          <CharacterCard
            key={index}
            character={character}
            onClick={() => setCharacterBeingEdited(character)}
          />
        );
      })}
    </div>
  );
};

export default CharacterCards;
