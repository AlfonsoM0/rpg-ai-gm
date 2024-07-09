import type { Characteristic } from 'types/character';

export function roll2d6(mod: number) {
  const r1d6 = () => Math.ceil(Math.random() * 6);
  return r1d6() + r1d6() + mod;
}

export function esMsgRoll2d6(name: string, char: Characteristic, mod: number): string {
  const charNames = {
    strength: 'Fuerza',
    dexterity: 'Destreza',
    constitution: 'Constitución',
    intelligence: 'Inteligencia',
    wisdom: 'Sabiduría',
    charisma: 'Carisma',
  } as { [key in Characteristic]: string };

  return `**${name}** realiza una prueba de ${
    charNames[char]
  } (2d6 +${mod})... \n\n y obtiene un resultado de: **${roll2d6(mod)}**.`;
}
