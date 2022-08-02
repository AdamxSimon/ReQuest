// React

import { createContext, useState } from "react";

// Import

import { Character } from "../types/Character";

interface CharactersToolContextState {
  characterBeingEdited: Character | null
  setCharacterBeingEdited:  React.Dispatch<React.SetStateAction<Character | null>>;
}

export const CharactersToolContext = createContext<CharactersToolContextState>(
  {} as CharactersToolContextState
);

interface CharactersProviderProps {
  children: JSX.Element;
}

export const CharactersToolProvider = ({
  children,
}: CharactersProviderProps): JSX.Element => {

  const [characterBeingEdited, setCharacterBeingEdited] = useState<Character | null>(null);

  const value: CharactersToolContextState = {
    characterBeingEdited,
    setCharacterBeingEdited
  };

  return (
    <CharactersToolContext.Provider value={value}>
      {children}
    </CharactersToolContext.Provider>
  );
};
