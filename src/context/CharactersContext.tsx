// React

import { createContext, useEffect, useState } from "react";

// Import

import { Character } from "../types/Character";

enum LocalStorageKeys {
  Characters = "characters",
}

interface CharactersContextState {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
}

const characterSaveData: string | null = localStorage.getItem(
  LocalStorageKeys.Characters
);

const initialCharactersState: Character[] = !!characterSaveData
  ? JSON.parse(characterSaveData)
  : [];

export const CharactersContext = createContext<CharactersContextState>(
  {} as CharactersContextState
);

interface CharactersProviderProps {
  children: JSX.Element;
}

export const CharactersProvider = ({
  children,
}: CharactersProviderProps): JSX.Element => {
  const [characters, setCharacters] = useState<Character[]>(
    initialCharactersState
  );

  const value: CharactersContextState = { characters, setCharacters };

  useEffect(() => {
    localStorage.setItem(
      LocalStorageKeys.Characters,
      JSON.stringify(characters)
    );
  }, [characters]);

  return (
    <CharactersContext.Provider value={value}>
      {children}
    </CharactersContext.Provider>
  );
};
