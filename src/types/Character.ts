export class Character {
  id: number;
  info: Info;
  proficiencyBonus: number;
  attributes: Attributes;
  savingThrows: SavingThrows;
  skills: Skills;
  constructor(config: { id: number }) {
    this.id = config.id;
    this.info = {
      name: "",
      level: "",
      class: "",
      race: "",
      age: "",
      background: "",
      alignment: "",
      experience: "",
    };
    this.proficiencyBonus = 0;
    this.attributes = {
      strength: 8,
      dexterity: 8,
      constitution: 8,
      intelligence: 8,
      wisdom: 8,
      charisma: 8,
    };
    this.savingThrows = {
      strength: false,
      dexterity: false,
      constitution: false,
      intelligence: false,
      wisdom: false,
      charisma: false,
    };
    this.skills = {
      acrobatics: { isProficient: false, relevantAttribute: "dexterity" },
      animalHandling: { isProficient: false, relevantAttribute: "wisdom" },
      arcana: { isProficient: false, relevantAttribute: "intelligence" },
      athletics: { isProficient: false, relevantAttribute: "strength" },
      deception: { isProficient: false, relevantAttribute: "charisma" },
      history: { isProficient: false, relevantAttribute: "intelligence" },
      insight: { isProficient: false, relevantAttribute: "wisdom" },
      intimidation: { isProficient: false, relevantAttribute: "charisma" },
      investigation: { isProficient: false, relevantAttribute: "intelligence" },
      medicine: { isProficient: false, relevantAttribute: "wisdom" },
      nature: { isProficient: false, relevantAttribute: "intelligence" },
      perception: { isProficient: false, relevantAttribute: "wisdom" },
      performance: { isProficient: false, relevantAttribute: "charisma" },
      persuasion: { isProficient: false, relevantAttribute: "charisma" },
      religion: { isProficient: false, relevantAttribute: "intelligence" },
      sleightOfHand: { isProficient: false, relevantAttribute: "dexterity" },
      stealth: { isProficient: false, relevantAttribute: "dexterity" },
      survival: { isProficient: false, relevantAttribute: "wisdom" },
    };
  }
}

type InfoKeys =
  | "name"
  | "level"
  | "class"
  | "race"
  | "age"
  | "background"
  | "alignment"
  | "experience";

export type Info = {
  [key in InfoKeys]: string;
};

type AttributeKeys =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma";

export type Attributes = {
  [key in AttributeKeys]: number;
};

type SavingThrowsKeys = AttributeKeys;

export type SavingThrows = {
  [key in SavingThrowsKeys]: boolean;
};

export type SkillKeys =
  | "acrobatics"
  | "animalHandling"
  | "arcana"
  | "athletics"
  | "deception"
  | "history"
  | "insight"
  | "intimidation"
  | "investigation"
  | "medicine"
  | "nature"
  | "perception"
  | "performance"
  | "persuasion"
  | "religion"
  | "sleightOfHand"
  | "stealth"
  | "survival";

export type Skills = {
  [key in SkillKeys]: {
    isProficient: boolean;
    relevantAttribute: AttributeKeys;
  };
};
