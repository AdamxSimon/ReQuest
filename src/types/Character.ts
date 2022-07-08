export interface Character {
  name: string;
  health: number;
  attack: number;
  defense: number;
  speed: number;
  attributes: Attributes;
  skills: string[];
}

export interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
