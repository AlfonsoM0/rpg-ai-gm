import type { Characteristic } from 'types/character';

export function roll2d6(mod: number) {
  const r1d6 = () => Math.ceil(Math.random() * 6);

  const r1 = r1d6();
  const r2 = r1d6();

  return { r1, r2, total: r1 + r2 + mod };
}
