export function roll2d6(mod: number) {
  const r1d6 = () => Math.floor(Math.random() * 6);
  const result = r1d6() + r1d6();
  return result + mod;
}
