'use client';

import { usePathname } from '@/navigation';
import { AI_ROLE } from 'config/constants';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { useUserPreferencesStore } from 'hooks/use-user-preferences-store';
import { useTranslations } from 'next-intl';

export default function CollapseShortcuts() {
  const t = useTranslations('ModaIdeasForAI.Recomended_Shortcuts');

  const ideas = [
    t('shortcut1'),
    t('shortcut2'),
    t('shortcut3'),
    t('shortcut4'),
    t('shortcut5'),
    t('shortcut6'),
    t('shortcut7'),
    t('shortcut8'),
    t('shortcut9'),
    t('shortcut10'),
    t('shortcut11'),
    t('shortcut12'),
    t('shortcut13'),
    t('shortcut14'),
  ];
  const { addContent } = useGmAiStore();
  const { setModalIsOpen } = useModalState();
  const { addChatShortcut, chatShortcuts } = useUserPreferencesStore();

  const pathname = usePathname();
  const isOutOfStory = pathname !== '/story';
  function handleClick(idea: string) {
    if (isOutOfStory) return;
    addContent({
      role: AI_ROLE.USER,
      parts: [{ text: idea }],
    });
    setModalIsOpen(false);
  }

  return (
    <div className="collapse collapse-plus">
      <input type="radio" name="tips-y-atajos" />

      <div className="collapse-title text-xl font-medium">{t('title')}</div>

      <div className="collapse-content">
        {ideas.map((idea, index) => {
          const isIdeaInMyShortcuts = chatShortcuts.includes(idea);
          const buttonStyle = isIdeaInMyShortcuts ? 'btn p-1 btn-success' : 'btn p-1';
          return (
            <div key={index} className="flex gap-2 justify-between">
              <button
                onClick={() => handleClick(idea)}
                className="btn w-[calc(100%-2rem)] mb-2 hover:font-bold"
                disabled={isOutOfStory}
                aria-label={`Shortcut: ${idea}`}
              >
                {idea}
              </button>
              <button
                className={buttonStyle}
                onClick={() => addChatShortcut(idea)}
                aria-label={t('Add_to_My_Shortcuts')}
              >
                +
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
