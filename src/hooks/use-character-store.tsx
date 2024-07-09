import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Character } from 'types/character';

interface CharacterStore {
  inGameCharacters: Character[];
  allCharacters: Character[];
}

interface CharacterActions {
  addInGameCharacter: (character: Character) => void;
  removeInGameCharacter: (id: string) => void;
  removeAllInGameCharacter: () => void;

  addAllCharacter: (character: Character) => void;
  removeAllCharacter: (id: string) => void;

  findCharacterByIdAndIcrementXp: (id: string, amount: number) => void;
}

export const useCharacterStore = create<CharacterStore & CharacterActions>()(
  devtools(
    persist(
      (set, get) => ({
        inGameCharacters: [],
        allCharacters: [],

        // Actions
        addInGameCharacter: (character) =>
          set((state) => ({ inGameCharacters: [...state.inGameCharacters, character] })),

        removeInGameCharacter: (id) =>
          set((state) => ({ inGameCharacters: state.inGameCharacters.filter((c) => c.id !== id) })),

        removeAllInGameCharacter: () => set(() => ({ inGameCharacters: [] })),

        addAllCharacter: (character) =>
          set((state) => ({ allCharacters: [character, ...state.allCharacters] })),

        removeAllCharacter: (id) =>
          set((state) => ({ allCharacters: state.allCharacters.filter((c) => c.id !== id) })),

        findCharacterByIdAndIcrementXp: (id, amount) => {
          const character = get().allCharacters.find((c) => c.id === id);
          if (character) {
            set((state) => ({
              allCharacters: state.allCharacters.map((c) =>
                c.id === id ? { ...c, xp: c.xp + amount } : c
              ),
            }));

            // Update inGameCharacters if the character is currently in game
            const inGameCharacter = get().inGameCharacters.find((c) => c.id === id);
            if (inGameCharacter) {
              set((state) => ({
                inGameCharacters: state.inGameCharacters.map((c) =>
                  c.id === id ? { ...c, xp: c.xp + amount } : c
                ),
              }));
            }
          }
        },
      }),
      { name: 'character-storage' }
    )
  )
);

/* //|> Character Storage Example
 {"state":{"inGameCharacters":[],"allCharacters":[{"id":"d49d6f83-ce46-4caa-ac90-ba87468c5ba5","xp":250,"name":"Invictus Lumashay","appearance":"Un hombre fornido y bien entrenado militarmente en el mortífero mundo de Catachan.\n","background":"Soldado de asalato Catachan. Basado en Warhammer 40000.","profession":"Soldado de la Guardia Imperial.","personality":"Valiente y bromista.","equipment":"Espada-motosierra, rifle laser pesado, cuchillo Catachán.","powers":"Oculta una mutación hereje, una cicatriz en el pecho, que le permite sentir y percibir cosas del warp que otros no pueden notar.","characteristics":{"strength":3,"dexterity":4,"constitution":3,"intelligence":2,"wisdom":2,"charisma":2}},{"id":"54783b88-3179-43d4-80cb-d8a3eb973ad0","xp":250,"name":"Nachdruk Stormlight","appearance":"Un viejo sabio del Adeptus Astra Telepática.","background":"Psíquico nacido en el vacío. Basado en Warhammer 40000.","profession":"Psíquico de la Guardia Imperial.","personality":"Serio, sombrío, calculador.","equipment":"Báculo psíquico, espada psíquica, amuleto de focus psíquico.","powers":"Telepatía, precognición, biomancia (curar, lanzar rayos eléctricos), telequinesis.","characteristics":{"strength":2,"dexterity":2,"constitution":2,"intelligence":3,"wisdom":4,"charisma":3}}]},"version":0}
 */
