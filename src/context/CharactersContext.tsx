// React

import { createContext, useEffect, useState } from "react";

// Interfaces

import { Character } from "../types/Character";

enum LocalStorageKeys {
  Characters = "characters",
}

interface CharactersContext {
  characters?: [];
  setCharacters?: any;
}

export const CharactersContext = createContext<CharactersContext>({});

interface CharactersProviderProps {
  children: JSX.Element;
}

export const CharactersProvider = ({
  children,
}: CharactersProviderProps): JSX.Element => {
  const [characters, setCharacters] = useState<[]>([]);

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
    console.log(characters);
  }, [characters]);

  return (
    <CharactersContext.Provider value={value}>
      {children}
    </CharactersContext.Provider>
  );
};
