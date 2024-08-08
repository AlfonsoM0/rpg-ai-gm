'use client';

import { useEffect, useRef } from 'react';
import { useModalState } from 'hooks/use-modal-state';
import { useTranslations } from 'next-intl';

export function Modal(): JSX.Element {
  const t = useTranslations('buttons');

  const { isOpen, content, setModalIsOpen, setModalContent } = useModalState();

  const refDialog = useRef<HTMLDivElement>(null);

  // clean up on close
  useEffect(() => {
    if (!isOpen) setModalContent(<></>);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- avoid circular dependency
  }, [isOpen]);

  function handleClickOutside(e: React.MouseEvent<HTMLDialogElement, MouseEvent>) {
    if (refDialog.current && !refDialog.current.contains(e.target as Node)) setModalIsOpen(false);
  }

  return (
    <dialog className="modal backdrop-blur-sm" open={isOpen} onClick={handleClickOutside}>
      <div className="modal-box border-2" ref={refDialog}>
        <button
          className="btn btn-sm btn-circle absolute right-3 top-3"
          onClick={() => setModalIsOpen(false)}
          type="button"
          aria-label={t('Close')}
        >
          <span className="text-xl">x</span>
        </button>

        {content}
      </div>
    </dialog>
  );
}

export * from './modal-content-container';
