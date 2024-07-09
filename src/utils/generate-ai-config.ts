import { GenerationConfig } from '@google/generative-ai';

export const aiModels: GenerationConfig[] = [
  // Structured AI
  { temperature: 0.3, topP: 0.9, topK: 40, maxOutputTokens: 1500, responseMimeType: 'text/plain' },

  // Virtuous AI
  { temperature: 0.6, topP: 0.8, topK: 60, maxOutputTokens: 1800, responseMimeType: 'text/plain' },

  // Creative AI
  { temperature: 0.9, topP: 0.7, topK: 80, maxOutputTokens: 2000, responseMimeType: 'text/plain' },
];

export function generateAiConfig(contentLength: number): GenerationConfig {
  const nInteractions = Math.ceil(contentLength / 2);

  const temp = nInteractions * 0.03;
  const tP = nInteractions * 0.01;
  const tK = nInteractions * 2;
  const mxOT = nInteractions * 25;

  const newGenerationConfig: GenerationConfig = {
    temperature: Math.min(0.3 + temp, 2),
    topP: Math.max(0.9 - tP, 0.7),
    topK: Math.min(40 + tK, 80),
    maxOutputTokens: Math.min(1500 + mxOT, 2000),
    responseMimeType: 'text/plain',
  };

  console.info('AI config nInteractions => ', nInteractions);
  console.info('AI newGenerationConfig => ', newGenerationConfig);

  return newGenerationConfig;
}
