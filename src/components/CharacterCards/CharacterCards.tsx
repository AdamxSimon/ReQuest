// React

import { useContext } from "react";

// Context

import { CharactersContext } from "../../context/CharactersContext";

// Custom Components

import CharacterCard from "../CharacterCard/CharacterCard";

// Enums

import { CharacterViews } from "../../tools/CharactersTool/CharactersTool";

// Styles

import classes from "./styles.module.css";

interface CharacterCardsProps {
  setCharacterIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const CharacterCards = (props: CharacterCardsProps): JSX.Element => {
  const { setCharacterIndex } = props;

  const { characters } = useContext(CharactersContext);

  return (
    <>
      <div className={classes.cardContainer}>
        {characters?.map((character, index) => {
          return (
            <CharacterCard
              key={index}
              character={character}
              onClick={() => setCharacterIndex(index)}
            />
          );
        })}
      </div>
    </>
  );
};

export default CharacterCards;
