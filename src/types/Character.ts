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
  skills: Skills[];
  [key: string]: string | number | Attributes | string[];
}

export class Character {
  constructor() {
    this.name = "";
    this.level = "";
    this.class = "";
    this.race = "";
    this.age = "";
    this.background = "";
    this.alignment = "";
    this.experience = "";
    this.health = 0;
    this.attack = 0;
    this.defense = 0;
    this.speed = 0;
    this.attributes = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    };
    this.skills = [];
  }
}

export interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  [key: string]: number;
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
