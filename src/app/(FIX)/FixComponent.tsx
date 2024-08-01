'use client';

import { useEffect } from 'react';
import useFIX_MoveCharactersToNewState from './useFIX_MoveCharactersToNewState';
import { useModalState } from 'hooks/use-modal-state';

// 'regenerator-runtime' is a polyfill for async/await and generators in JavaScript. It's used to make sure that your code can run on older browsers that don't support these features natively.
// We use 'regenerator-runtime' module for Button.STT compoment works correctly Client Side.
import 'regenerator-runtime/runtime';
import { Locale } from '../../i18n';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import ModalNews from './ModalNews';

interface FixComponentProps {
  locale: Locale;
}

export default function FixComponent({ locale }: FixComponentProps) {
  useFIX_MoveCharactersToNewState();

  const { setModalContent, setModalIsOpen } = useModalState();

  // TODO: delete alert
  useEffect(() => {
    setTimeout(() => {
      setModalContent(<ModalNews />);
      setModalIsOpen(true);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Instal Locale config in GmAi chat and set html lang attribute for a11y support.
  const { setLocale } = useGmAiStore();
  useEffect(() => {
    setLocale(locale);
    const html = document.querySelector('html');
    if (html) {
      html.lang = locale; // Set the lang attribute of the HTML tag to the current locale
    }
  }, [locale, setLocale]);

  return <></>;
}
