import { GenerationConfig } from '@google/generative-ai';

const aiModels = {
  Strict_AI: {
    temperature: 0.3,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 1500,
    responseMimeType: 'text/plain',
  },

  Virtuous_AI: {
    temperature: 0.6,
    topP: 0.8,
    topK: 60,
    maxOutputTokens: 1800,
    responseMimeType: 'text/plain',
  },

  Creative_AI: {
    temperature: 0.9,
    topP: 0.7,
    topK: 80,
    maxOutputTokens: 2000,
    responseMimeType: 'text/plain',
  },
} as { Strict_AI: GenerationConfig; Virtuous_AI: GenerationConfig; Creative_AI: GenerationConfig };

export type AiModels = keyof typeof aiModels | 'Progresive_AI' | 'Random_AI';

export function generateAiConfig(contentLeng: number, aiType: AiModels): GenerationConfig {
  if (aiType === 'Progresive_AI') {
    const nInteractions = Math.ceil(contentLeng / 2);

    const temp = nInteractions * 0.06;
    const tP = nInteractions * 0.02;
    const tK = nInteractions * 4;
    const mxOT = nInteractions * 50;

    const newGenerationConfig: GenerationConfig = {
      temperature: Math.min(0.3 + temp, 2),
      topP: Math.max(0.9 - tP, 0.7),
      topK: Math.min(40 + tK, 80),
      maxOutputTokens: Math.min(1500 + mxOT, 2000),
      responseMimeType: 'text/plain',
    };

    return newGenerationConfig;
  } else if (aiType === 'Random_AI') {
    const randomOpt: (keyof typeof aiModels)[] = ['Strict_AI', 'Virtuous_AI', 'Creative_AI'];
    const randomIndex = Math.floor(Math.random() * randomOpt.length);
    return aiModels[randomOpt[randomIndex]];
  } else {
    return aiModels[aiType];
  }
}
