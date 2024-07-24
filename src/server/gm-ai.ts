'use server';

// https://ai.google.dev/gemini-api/docs/get-started/node

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Content,
  GenerationConfig,
  SafetySetting,
} from '@google/generative-ai';
import { AI_MODEL } from 'config/constants';

const API_KEY = process.env.AI_APY_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: AI_MODEL.GEMINI_PRO });

const generationConfigDefault: GenerationConfig = {
  // Strict AI
  temperature: 0.3,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 1500,
  responseMimeType: 'text/plain',
};

// See https://ai.google.dev/gemini-api/docs/safety-settings
const safetySettings: SafetySetting[] = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

export default async function runAIChat(
  userInput: string,
  history?: Content[],
  generationConfigCustom?: GenerationConfig
) {
  const contents = history ? history : [];

  const chat = model.startChat({
    generationConfig: generationConfigCustom || generationConfigDefault,
    safetySettings,
    history,
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  const { text, promptFeedback, usageMetadata } = response;

  // console.log('AI result/response/promptFeedback => ', promptFeedback);
  console.log(
    'AI result/response/usageMetadata/totalTokenCount => ',
    usageMetadata?.totalTokenCount
  );
  // console.log('AI result/response/text => ', text);

  return text();
}

/* //|> Opciones de configuraciones
 
//|> Opción 1: Game Master AI Conservador - "Maestro de las Reglas"

Esta configuración se centra en seguir estrictamente las reglas y crear una experiencia más clásica.

{ "temperature": 0.3, "topP": 0.9, "topK": 40, "maxOutputTokens": 1500, "responseMimeType": "text/plain" }

Descripción: Un Game Master AI que se ajusta con estrictez a las reglas del juego. Sus respuestas son más previsibles y consistentes, siguiendo un patrón más estable.

Ventajas: Mantener la integridad del sistema de reglas y brindar una experiencia más "clásica" para aquellos que buscan una narrativa más formal.
Desventajas: Menos innovación y sorpresas en la narrativa, respuestas más restringidas y menos creatividad a la hora de elaborar ideas o elementos.

//|> Opción 2: Game Master AI Creativo - "El Cuentista Imaginativo"

Esta configuración está enfocada en la narrativa audaz, con un énfasis en la imaginación y la espontaneidad.

{ "temperature": 0.8, "topP": 0.7, "topK": 80, "maxOutputTokens": 2000, "responseMimeType": "text/plain" }

Descripción: Un Game Master AI que se anima a romper los moldes tradicionales de la narración y busca impactar con su creatividad e innovación.

Ventajas: Narrativas más imaginativas, llenas de elementos sorprendentes e inusuales. Se permite mayor libertad a la hora de experimentar con ideas o situaciones.
Desventajas: Mayor probabilidad de incoherencias o saltos bruscos en la narración. Las reglas podrían ser mencionados de manera más laxa o se perdería el equilibrio.

//|> Opción 3: Game Master AI Intermedio - "Maestro de la Ambigüedad"

Esta configuración es una combinación equilibrada de reglas y creatividad, dando lugar a una experiencia más fluida e interesante.

{ "temperature": 0.6, "topP": 0.85, "topK": 60, "maxOutputTokens": 1800, "responseMimeType": "text/plain" }

Descripción: Un Game Master AI que se acomoda al equilibrio entre la coherencia y el elemento imaginativo. Ofrece una narrativa fluida, interesante y más viva.

Ventajas: Respetar el sistema de reglas a la vez que se introduce el elemento de creatividad para enriquecer la experiencia de los jugadores.
Desventajas: A pesar de que ofrece una mezcla interesante, su fuerza reside en el equilibrio. En ocasiones podría ser más "seguro" que la opción 2 o más laxo que la opción 1.

 */
