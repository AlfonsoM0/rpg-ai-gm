import type { Characteristic } from 'types/character';

export function roll2d6(mod: number) {
  const r1d6 = () => Math.floor(Math.random() * 6);
  const result = r1d6() + r1d6();
  return result + mod;
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

  return `${name}, realiza una prueba de 2d6 +${mod} (${charNames[char]}) y obtiene: ${roll2d6(
    mod
  )}.`;
}
