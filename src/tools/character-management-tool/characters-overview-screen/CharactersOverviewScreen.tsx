// React

import { useContext } from "react";

// Context

import { CharactersContext } from "../../../context/CharactersContext";

// Components

import CharacterCard from "./character-card/CharacterCard";

// Types

import { Character } from "../../../types/Character";

// Styles

import classes from "./styles.module.css";

interface CharactersOverviewScreenProps {
  setCharacterBeingEdited: React.Dispatch<
    React.SetStateAction<Character | null>
  >;
}

const CharactersOverviewScreen = (
  props: CharactersOverviewScreenProps
): JSX.Element => {
  const { setCharacterBeingEdited } = props;

  const { characters } = useContext(CharactersContext);

  return (
    <div className={classes.cardContainer}>
      {characters.map((character, index) => {
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

export default CharactersOverviewScreen;
