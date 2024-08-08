'use client';

import { ModalContentContainer } from 'components/modal';
import { MarkdownOptions } from 'config/constants';
import { useModalState } from 'hooks/use-modal-state';
import Markdown from 'markdown-to-jsx';
import { useTranslations } from 'next-intl';

export default function ModalNews() {
  const t = useTranslations('ModalNews');

  const { setModalIsOpen } = useModalState();

  return (
    <ModalContentContainer title={t('Title')} titleColor="warning">
      <Markdown options={MarkdownOptions}>{t('MarkdownText')}</Markdown>

      <button
        onClick={() => setModalIsOpen(false)}
        className="btn btn-primary mt-4 w-full text-xl font-bold"
        aria-label={t('btn_OK')}
      >
        {t('btn_OK')}
      </button>
    </ModalContentContainer>
  );
}
