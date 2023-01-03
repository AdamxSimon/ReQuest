// React

import { createContext, useEffect, useMemo, useState } from "react";

// Types

import { Spell } from "../types/Character";

const SPELLS_API_URL = "https://www.dnd5eapi.co/api/spells";

const spellsSaveData: string | null = localStorage.getItem("spells");

const initialSpellsState: Spell[] = spellsSaveData
  ? JSON.parse(spellsSaveData)
  : [];

interface SpellsContextValue {
  spells: Spell[];
  isLoading: boolean;
}

export const SpellsContext: React.Context<SpellsContextValue> =
  createContext<SpellsContextValue>({
    spells: [],
    isLoading: true,
  });

interface SpellsProviderProps {
  children: JSX.Element;
}

const SpellsProvider = ({ children }: SpellsProviderProps): JSX.Element => {
  const [spells, setSpells] = useState<Spell[]>(initialSpellsState);
  const [isLoading, setIsLoading] = useState<boolean>(
    initialSpellsState.length === 0
  );

  useEffect(() => {
    if (spells.length === 0) {
      fetch(SPELLS_API_URL).then((response) => {
        response
          .json()
          .then(
            async (data: {
              count: number;
              results: { index: string; name: string; url: string }[];
            }) => {
              const fetchedSpells: Spell[] = await Promise.all(
                data.results.map((result) =>
                  fetch(SPELLS_API_URL + "/" + result.index).then((response) =>
                    response.json()
                  )
                )
              );
              setSpells(fetchedSpells);
              setIsLoading(false);
              localStorage.setItem("spells", JSON.stringify(fetchedSpells));
            }
          );
      });
    }
  }, [spells]);

  const value: SpellsContextValue = useMemo(() => {
    return { spells, isLoading };
  }, [spells, isLoading]);

  return (
    <SpellsContext.Provider value={value}>{children}</SpellsContext.Provider>
  );
};

export default SpellsProvider;
