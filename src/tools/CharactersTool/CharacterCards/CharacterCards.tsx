// React

import { useContext } from "react";

// Context

import { CharactersContext } from "../../../context/CharactersContext";

// Custom Components

import CharacterCard from "../../../components/CharacterCard/CharacterCard";

// Styles

import classes from "./styles.module.css";

const CharacterCards = (): JSX.Element => {
  const { characters } = useContext(CharactersContext);

  return (
    <>
      <div className={classes.cardContainer}>
        {characters?.map((character, index) => {
          return <CharacterCard key={index} character={character} />;
        })}
      </div>
    </>
  );
};

export default CharacterCards;
