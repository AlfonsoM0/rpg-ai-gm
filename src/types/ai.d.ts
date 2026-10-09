/**
 * Chat message shape shared by the app (client & server).
 * Same structure as Gemini's Content, without depending on the SDK in client code.
 */
export type Content = {
  role: string;
  parts: { text: string }[];
};
