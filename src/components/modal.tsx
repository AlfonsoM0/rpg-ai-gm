'use client';

import { useEffect } from 'react';
import { useModalState } from 'hooks/use-modal-state';

export function Modal(): JSX.Element {
  const { isOpen, content, setModalIsOpen, setModalContent } = useModalState();

  // clean up on close
  useEffect(() => {
    if (!isOpen) setModalContent(<></>);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- avoid circular dependency
  }, [isOpen]);

  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle absolute right-3 top-3"
          onClick={() => setModalIsOpen(false)}
          type="button"
        >
          <span className="text-xl">x</span>
        </button>

        {content}
      </div>
    </dialog>
  );
}
