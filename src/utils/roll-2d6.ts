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
    strength: 'FUE',
    dexterity: 'DES',
    constitution: 'CON',
    intelligence: 'INT',
    wisdom: 'SAB',
    charisma: 'CAR',
  } as { [key in Characteristic]: string };

  const dicesResult = roll2d6(mod);
  addResultToPlayerState(dicesResult);

  return `**${name}** realiza una prueba de 2d6 +${mod} (${charNames[char]})... \n\n y obtiene un resultado de: **${dicesResult}**.`;
}
