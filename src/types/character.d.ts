type Character = {
  id: string;
  xp: number;
  name: string;
  appareance: string;
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
