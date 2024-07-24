import CollapseTips from './collapse-tips';
import CollapseMyShortcuts from './collapse-my-shortcuts';
import CollapseShortcuts from './collapse-shortcuts';
import { ModalContentContainer } from 'components/modal';

export default function ModaIdeasForAI() {
  return (
    <ModalContentContainer title="Tips y Atajos" titleColor="info">
      <>
        <p className="py-4 text-sm">
          Estos son tips y atajos para ayudarte a mejorar tu experiencia con Game Master AI. <br />
        </p>

        <CollapseTips />

        <CollapseMyShortcuts />

        <CollapseShortcuts />
      </>
    </ModalContentContainer>
  );
}
