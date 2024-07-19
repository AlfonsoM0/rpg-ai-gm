'use client';

import { Icon } from 'components/icons';
import useFirebase from 'hooks/firebase';
import useAuthObserver from 'hooks/firebase/use-auth-observer';
import UserButtonConnect from './user-button-connect';
import ThemeController from 'components/theme-controller';
import ModalConfigAI, { aiIconStyle } from 'components/chat/chat-options-modals/modal-ai-config';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import UserAvatar from './user-avatar';

export default function UserButton() {
  const { user } = useFirebase();
  const { aiConfig } = useGmAiStore();
  const { setModalContent, setModalIsOpen } = useModalState();

  useAuthObserver();

  function onConfigAiClick() {
    setModalContent(<ModalConfigAI />);
    setModalIsOpen(true);
  }

  return (
    <details className="dropdown dropdown-end">
      <summary className="btn btn-ghost btn-circle">
        <UserAvatar />
      </summary>

      {/* CONTENT */}
      <div
        tabIndex={0}
        className="dropdown-content menu bg-secondary-content rounded-box z-[1] w-80 p-2 shadow"
      >
        <div className="flex justify-between items-center gap-4">
          <p className="font-bold">Opciones:</p>
          <button className="btn btn-ghost btn-circle" onClick={onConfigAiClick}>
            <Icon.AiBrain className={aiIconStyle[aiConfig]} />
          </button>
          <ThemeController />
        </div>

        <hr className="my-2" />

        <h3 className="font-bold text-lg mb-4 text-center text-primary">
          {user?.displayName ? user.displayName : 'Jugador no conectado'}
        </h3>

        <UserButtonConnect />
      </div>
    </details>
  );
}
