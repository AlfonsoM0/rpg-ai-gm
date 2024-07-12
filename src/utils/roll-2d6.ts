import type { Characteristic } from 'types/character';

export function roll2d6(mod: number) {
  const r1d6 = () => Math.ceil(Math.random() * 6);
  return r1d6() + r1d6() + mod;
}

export function esMsgRoll2d6(
  name: string,
  char: Characteristic,
  mod: number,
  addResultToPlayerState: (result: number) => void
): string {
  const charNames = {
    strength: 'Fuerza',
    dexterity: 'Destreza',
    constitution: 'Constitución',
    intelligence: 'Inteligencia',
    wisdom: 'Sabiduría',
    charisma: 'Carisma',
  } as { [key in Characteristic]: string };

  const dicesResult = roll2d6(mod);
  addResultToPlayerState(dicesResult);

  return `**${name}** realiza una prueba de ${charNames[char]} con 2d6 +${mod}... \n\n y obtiene un resultado de: **${dicesResult}**.`;
}
