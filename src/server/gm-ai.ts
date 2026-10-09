'use server';

// https://ai.google.dev/gemini-api/docs/quickstart?lang=node
import {
  GoogleGenAI,
  HarmCategory,
  HarmBlockThreshold,
  SafetySetting,
  ThinkingLevel,
} from '@google/genai';
import { Content } from 'types/ai';
import { AiConfig } from 'utils/generate-ai-config';
import { AI_MODEL, AI_MODEL_TYPE, AI_MODELS, AI_ROLE } from 'config/constants';

// https://platform.openai.com/docs/overview
import OpenAI from 'openai';
import { ResponseInputItem } from 'openai/resources/responses/responses.mjs';

const generationConfigDefault: AiConfig = {
  // Strict AI
  maxOutputTokens: 1500,
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
  generationConfigCustom?: AiConfig,
  aiModels?: AI_MODEL_TYPE[]
) {
  aiModels = aiModels ? [...aiModels, ...AI_MODELS] : AI_MODELS;

  function mapConfigToOpenAI(config: AiConfig) {
    return {
      max_output_tokens: config.maxOutputTokens,
    };
  }
  function mapHistoryToOpenAI(history: Content[] | undefined = []): ResponseInputItem[] {
    return history.map((item) => ({
      role: item.role === AI_ROLE.USER ? 'user' : 'assistant',
      content: item.parts.map((p) => p.text).join(' '),
    }));
  }

  const configs = generationConfigCustom || generationConfigDefault;

  for (const ai of aiModels) {
    try {
      if (ai.MODEL.includes('gemini')) {
        // Si el modelo es Gemini, se usa la configuración de GoogleGenerativeAI
        console.log(`🟡 Usando ${ai.MODEL}...`);

        const genAI = new GoogleGenAI({ apiKey: ai.API_KEY });
        const chat = genAI.chats.create({
          model: ai.MODEL,
          history,
          config: {
            ...configs,
            safetySettings,
            // Thinking tokens count toward maxOutputTokens: keep reasoning short.
            // Gemini 1.x/2.x (e.g. user AI models) reject thinkingLevel.
            ...(!/^gemini-[12]\./.test(ai.MODEL) && {
              thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            }),
          },
        });
        const response = await chat.sendMessage({ message: userInput });
        const textResult = response.text ?? '';

        if (typeof textResult === 'string' && textResult.trim().length > 0) {
          console.log(`🟢 Respuesta de ${ai.MODEL}: ${textResult}`);
          return textResult;
        }
      } else if (ai.MODEL.includes('gpt')) {
        // Si el modelo es OpenAI, se usa la configuración de OpenAI
        console.log(`🟡 Usando ${ai.MODEL}...`);

        const openai = new OpenAI({ apiKey: ai.API_KEY });
        // Usar el endpoint de responses.create según la nueva documentación
        const response = await openai.responses.create({
          model: ai.MODEL,
          input: [...mapHistoryToOpenAI(history), { role: 'user', content: userInput }],
          ...mapConfigToOpenAI(configs),
        });
        const textResult = response.output_text?.trim() || '';

        if (textResult.length > 0) {
          console.log(`🟢 Respuesta de ${ai.MODEL}: ${textResult}`);
          return textResult;
        }
      }
    } catch (err) {
      console.error(`🔴 Error con modelo ${ai.MODEL} => `, err);
      continue;
    }
  }
  return '';
}

/* //|> Opciones de configuraciones

NOTA: originalmente cada opción se implementaba con temperature/topP/topK, que Gemini deprecó.
Se conservan como referencia para el rediseño de los perfiles (ver TODO en utils/generate-ai-config.ts).
 
//|> Opción 1: Game Master AI Conservador - "Maestro de las Reglas"

Esta configuración se centra en seguir estrictamente las reglas y crear una experiencia más clásica.


Descripción: Un Game Master AI que se ajusta con estrictez a las reglas del juego. Sus respuestas son más previsibles y consistentes, siguiendo un patrón más estable.

Ventajas: Mantener la integridad del sistema de reglas y brindar una experiencia más "clásica" para aquellos que buscan una narrativa más formal.
Desventajas: Menos innovación y sorpresas en la narrativa, respuestas más restringidas y menos creatividad a la hora de elaborar ideas o elementos.

//|> Opción 2: Game Master AI Creativo - "El Cuentista Imaginativo"

Esta configuración está enfocada en la narrativa audaz, con un énfasis en la imaginación y la espontaneidad.


Descripción: Un Game Master AI que se anima a romper los moldes tradicionales de la narración y busca impactar con su creatividad e innovación.

Ventajas: Narrativas más imaginativas, llenas de elementos sorprendentes e inusuales. Se permite mayor libertad a la hora de experimentar con ideas o situaciones.
Desventajas: Mayor probabilidad de incoherencias o saltos bruscos en la narración. Las reglas podrían ser mencionados de manera más laxa o se perdería el equilibrio.

//|> Opción 3: Game Master AI Intermedio - "Maestro de la Ambigüedad"

Esta configuración es una combinación equilibrada de reglas y creatividad, dando lugar a una experiencia más fluida e interesante.


Descripción: Un Game Master AI que se acomoda al equilibrio entre la coherencia y el elemento imaginativo. Ofrece una narrativa fluida, interesante y más viva.

Ventajas: Respetar el sistema de reglas a la vez que se introduce el elemento de creatividad para enriquecer la experiencia de los jugadores.
Desventajas: A pesar de que ofrece una mezcla interesante, su fuerza reside en el equilibrio. En ocasiones podría ser más "seguro" que la opción 2 o más laxo que la opción 1.

 */
