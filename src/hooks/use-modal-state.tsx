import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  content: JSX.Element;
}

interface ModalStateActions {
  setModalIsOpen: (isOpen: boolean) => void;
  setModalContent: (content: JSX.Element) => void;
}

const initialModalState: ModalState = {
  isOpen: false,
  content: <></>,
};

export const useModalState = create<ModalState & ModalStateActions>()((set) => {
  ...initialModalState,

  // Actions
  setModalIsOpen: (isOpen) => set({ isOpen }),
  setModalContent: (content) => set({ content }),
});
