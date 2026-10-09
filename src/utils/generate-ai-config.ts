export type AiConfig = {
  maxOutputTokens: number;
};

// TODO: los perfiles (Strict/Virtuous/Creative/Progresive/Random) ya no cambian el comportamiento:
// Gemini deprecó temperature/topP/topK y solo varía maxOutputTokens. Rediseñar
// (p. ej. instrucción de estilo en el prompt y/o thinkingLevel por perfil).

const aiModels = {
  Strict_AI: {
    maxOutputTokens: 1500,
  },

  Virtuous_AI: {
    maxOutputTokens: 1800,
  },

  Creative_AI: {
    maxOutputTokens: 2000,
  },
} as { Strict_AI: AiConfig; Virtuous_AI: AiConfig; Creative_AI: AiConfig };

export type AiModels = keyof typeof aiModels | 'Progresive_AI' | 'Random_AI';

export function generateAiConfig(contentLeng: number, aiType: AiModels): AiConfig {
  if (aiType === 'Progresive_AI') {
    const nInteractions = Math.ceil(contentLeng / 2);
    const mxOT = nInteractions * 50;

    const newAiConfig: AiConfig = {
      maxOutputTokens: Math.min(1500 + mxOT, 2000),
    };

    return newAiConfig;
  } else if (aiType === 'Random_AI') {
    const randomOpt: (keyof typeof aiModels)[] = ['Strict_AI', 'Virtuous_AI', 'Creative_AI'];
    const randomIndex = Math.floor(Math.random() * randomOpt.length);
    return aiModels[randomOpt[randomIndex]];
  } else {
    return aiModels[aiType];
  }
}
