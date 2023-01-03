export class Character {
  id: number;
  info: Info;
  proficiencyBonus: number;
  attributes: Attributes;
  savingThrows: SavingThrows;
  skills: Skills;
  spellLevels: SpellLevelProps[];
  notes: string;
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
    this.spellLevels = [{ spells: [] }];
    this.notes = "";
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

export interface SpellLevelProps {
  slotsTotal?: number;
  slotsLeft?: number;
  spells: Spell[];
}

enum Components {
  Verbal = "V",
  Somatic = "S",
  Material = "M",
}

enum AreaType {
  Sphere = "sphere",
  Cone = "cone",
  Cylinder = "cylinder",
  Line = "line",
}

export class Spell {
  id?: number;
  isPrepared?: boolean;
  index: string;
  name: string;
  url: string;
  desc: string[];
  higher_level: string[];
  range: string;
  components: Components[] | string;
  material: string;
  area_of_effect: {
    size: number;
    type: AreaType | string;
  };
  ritual: boolean;
  duration: string;
  concentration: boolean | string;
  casting_time: string;
  level: number;
  attack_type: string;
  damage?: {
    custom_damage?: string;
    damage_at_slot_level?: Record<string, string>;
    damage_at_character_level?: Record<string, string>;
    damage_type?: {
      index?: string;
      name?: string;
      url?: string;
    };
  };
  school: {
    index: string;
    name: string;
    url: string;
  };
  classes: {
    index: string;
    name: string;
    url: string;
  }[];
  subclasses: {
    index: string;
    name: string;
    url: string;
  }[];
  constructor(config?: Partial<Spell>) {
    this.id = config?.id || Date.now();
    this.isPrepared = config?.isPrepared || false;
    this.index = config?.index || "";
    this.name = config?.name || "";
    this.url = config?.url || "";
    this.desc = config?.desc || [];
    this.higher_level = config?.higher_level || [];
    this.range = config?.range || "";
    this.components = config?.components || [];
    this.material = config?.material || "";
    this.area_of_effect = config?.area_of_effect || {
      size: 0,
      type: "",
    };
    this.ritual = config?.ritual || false;
    this.duration = config?.duration || "";
    this.concentration = config?.concentration || "";
    this.casting_time = config?.casting_time || "";
    this.level = config?.level || 0;
    this.attack_type = config?.attack_type || "";
    this.damage = config?.damage || {
      custom_damage: "",
      damage_type: {
        index: "",
        name: "",
        url: "",
      },
    };
    this.school = config?.school || {
      index: "",
      name: "",
      url: "",
    };
    this.classes = config?.classes || [
      {
        index: "",
        name: "",
        url: "",
      },
    ];
    this.subclasses = config?.subclasses || [
      {
        index: "",
        name: "",
        url: "",
      },
    ];
  }
}
