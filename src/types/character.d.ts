export type Character = {
  id: string;
  xp: number;
  name: string;
  appearance: string;
  background: string;
  profession: string;
  personality: string;
  equipment: string;
  powers: string;
  characteristics: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
};

export type Characteristic = keyof Character['characteristics'];

export type CharacterCreationDescription =
  | 'appearance'
  | 'background'
  | 'profession'
  | 'personality'
  | 'equipment'
  | 'powers';
