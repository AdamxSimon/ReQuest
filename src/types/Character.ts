export interface Character {
  id: number;
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
  proficiencyBonus: number;
  attributes: Attributes;
  savingThrows: SavingThrows;
  skills: Skills[];
  image: string;
  [key: string]:
    | string
    | number
    | Attributes
    | SavingThrows
    | string[]
    | undefined;
}

export class Character {
  constructor(config: { id: number }) {
    this.id = config.id;
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
    this.proficiencyBonus = 0;
    this.attributes = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    };
    this.savingThrows = {
      strength: false,
      dexterity: false,
      constitution: false,
      intelligence: false,
      wisdom: false,
      charisma: false,
    };
    this.skills = [];
    this.image = "";
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

export interface SavingThrows {
  strength: boolean;
  dexterity: boolean;
  constitution: boolean;
  intelligence: boolean;
  wisdom: boolean;
  charisma: boolean;
  [key: string]: boolean;
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
