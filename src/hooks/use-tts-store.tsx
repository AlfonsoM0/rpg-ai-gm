import React from 'react';
import removeMarkdown from 'markdown-to-text';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface TTSStore {
  isTTSEnabled: boolean;
  isPlaying: boolean;
  isStopped: boolean;
  isPaused: boolean;
  voiceIndex: number;
  pitch: number;
  rate: number;
  volume: number;
  tts: string;
}

interface TTSActions {
  setIsTTSEnabled: (isTTSEnabled: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
  setVoiceIndex: (voiceIndex: number) => void;
  setTTS: (tts: string) => void;
}

interface TTSHandlers {
  handlePlay: (customTTS?: string) => void;
  handlePause: () => void;
  handleStop: () => void;
  handleChangeVoice: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangePitch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeRate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeVolume: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const initialTTSState: TTSStore = {
  isTTSEnabled: false,
  isPlaying: false,
  isStopped: true,
  isPaused: false,
  voiceIndex: -1,
  pitch: 1,
  rate: 1,
  volume: 1,
  tts: '¡Hola! soy Game Master AI. ¡A jugar!',
};

export const useTTSStore = create<TTSStore & TTSActions & TTSHandlers>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialTTSState,

        // Actions
        setIsTTSEnabled: (isTTSEnabled) => set({ isTTSEnabled }),
        setIsPaused: (isPaused) => set({ isPaused }),
        setVoiceIndex: (voiceIndex) => set({ voiceIndex }),
        setTTS: (tts) => set({ tts }),

        // Handlers
        handlePlay: (customTTS) => {
          const { isTTSEnabled, isPaused, voiceIndex, pitch, rate, volume, tts } = get();
          if (!isTTSEnabled) return;

          const cleanTTS = removeMarkdown(customTTS || tts);
          const utterance = new SpeechSynthesisUtterance(cleanTTS);
          // console.log('Markdown Text => ', customTTS || tts);
          // console.log('Clean Text => ', cleanTTS);

          if (isPaused && speechSynthesis) {
            speechSynthesis.resume();
          } else if (!isPaused && speechSynthesis) {
            const voices = speechSynthesis.getVoices();
            const voice = voices[voiceIndex];
            utterance.voice = voice;
            utterance.pitch = pitch;
            utterance.rate = rate;
            utterance.volume = volume;
            utterance.onend = () => set({ isPlaying: false, isPaused: false, isStopped: true });
            speechSynthesis.speak(utterance);
          }

          set({ isPlaying: true, isPaused: false, isStopped: false });
        },
        handlePause: () => {
          if (speechSynthesis) {
            speechSynthesis.pause();
            set({ isPlaying: false, isPaused: true, isStopped: false });
          }
        },
        handleStop: () => {
          if (speechSynthesis) {
            speechSynthesis.cancel();
            set({ isPlaying: false, isPaused: false, isStopped: true });
          }
        },
        handleChangeVoice: (event) => {
          if (speechSynthesis) {
            const voices = speechSynthesis.getVoices();
            const voiceFinded = voices.find((voice) => voice.name === event.target.value);
            if (voiceFinded) {
              set({ voiceIndex: voices.indexOf(voiceFinded) });
            }
          }
        },
        handleChangePitch: (event) => {
          set({ pitch: parseFloat(event.target.value) });
        },
        handleChangeRate: (event) => {
          set({ rate: parseFloat(event.target.value) });
        },
        handleChangeVolume: (event) => {
          set({ volume: parseFloat(event.target.value) });
        },
      }),
      { name: 'tts-storage' }
    )
  )
);
