'use client';

import { useRouter } from '@/navigation';
import { ModalContentContainer } from 'components/modal';
import { useModalState } from 'hooks/use-modal-state';
import ModalEndHistory from 'components/chat/chat-options-modals/modal-end-story';
import { useTranslations } from 'next-intl';

export default function ModalIsAStoryInProgress() {
  const t = useTranslations('Card_Book.modal.ModalIsAStoryInProgress');

  const router = useRouter();
  const { setModalIsOpen, setModalContent } = useModalState();

  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <>
        <p className="py-4">{t('p')}</p>

        <div className="modal-action justify-around">
          <button
            className="btn btn-sm btn-error"
            onClick={() => setModalContent(<ModalEndHistory />)}
            aria-label={t('btn.End_story')}
          >
            {t('btn.End_story')}
          </button>
          <button
            className="btn btn-sm btn-success"
            onClick={() => {
              router.push('/story');
              setModalIsOpen(false);
            }}
            aria-label={t('btn.Continue_story')}
          >
            {t('btn.Continue_story')}
          </button>
        </div>
      </>
    </ModalContentContainer>
  );
}
