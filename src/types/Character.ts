export interface Character {
  name: string;
  level: string;
  class: string;
  race: string;
  age: string;
  background: string;
  alignment: string;
  experience: string;
  health: number;
  attack: number;
  defense: number;
  speed: number;
  attributes: Attributes;
  skills: string[];
  [key: string]: string | number | Attributes | string[];
}

export interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export enum Skills {
  Acrobatics = "Acrobatics",
  AnimalHandling = "Animal Handling",
  Arcana = "Arcana",
  Athletics = "Athletics",
  Deception = "Deception",
  History = "History",
  Insight = "Insight",
  Intimidation = "Intimidation",
  Investigation = "Investigation",
  Medicine = "Medicine",
  Nature = "Nature",
  Perception = "Perception",
  Performance = "Performance",
  Persuasion = "Persuasion",
  Religion = "Religion",
  SleightOfHand = "Sleight of Hand",
  Stealth = "Stealth",
  Survival = "Survival",
}
