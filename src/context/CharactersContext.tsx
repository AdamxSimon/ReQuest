// React

import { createContext, useEffect, useState } from "react";

// Import

import { Character } from "../types/Character";

enum LocalStorageKeys {
  Characters = "characters",
}

interface CharactersContext {
  characters?: Character[];
  setCharacters?: React.Dispatch<React.SetStateAction<Character[]>>;
}

export const CharactersContext = createContext<CharactersContext>({});

interface CharactersProviderProps {
  children: JSX.Element;
}

export const CharactersProvider = ({
  children,
}: CharactersProviderProps): JSX.Element => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const value: CharactersContext = { characters, setCharacters };

  useEffect(() => {
    const data: string | null = localStorage.getItem(
      LocalStorageKeys.Characters
    );

    if (data !== null) setCharacters(JSON.parse(data));
  }, []);

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
