'use client';

import { usePathname } from '@/navigation';
import { AI_ROLE } from 'config/constants';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { useUserPreferencesStore } from 'hooks/use-user-preferences-store';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function CollapseMyShortcuts() {
  const t = useTranslations('ModaIdeasForAI.My_Shortcuts');

  const { addContent } = useGmAiStore();
  const { setModalIsOpen } = useModalState();
  const { chatShortcuts, addChatShortcut, removeChatShortcut, moveChatShortcut } =
    useUserPreferencesStore();

  const [newIdea, setNewIdea] = useState('');
  function onSubmitIdea(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimIda = newIdea.trim();
    if (!trimIda) return;
    addChatShortcut(trimIda);
    setNewIdea('');
  }
  function onIdeaUp(shortcut: string) {
    const indexOfShortcut = chatShortcuts.indexOf(shortcut);
    moveChatShortcut(shortcut, indexOfShortcut - 1);
  }
  function onIdeaDown(shortcut: string) {
    const indexOfShortcut = chatShortcuts.indexOf(shortcut);
    moveChatShortcut(shortcut, indexOfShortcut + 1);
  }

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
      <input type="radio" name="tips-y-atajos" defaultChecked />

      <div className="collapse-title text-xl font-medium">{t('title')}</div>

      <div className="collapse-content">
        {/* My shortcuts */}
        {chatShortcuts.map((shortcut, index) => (
          <div key={index} className="flex gap-2 justify-between">
            <button
              className="btn btn-error p-1"
              onClick={() => removeChatShortcut(shortcut)}
              aria-label={t('btn.Remove')}
            >
              X
            </button>

            <button
              onClick={() => handleClick(shortcut)}
              className="btn w-[calc(100%-4rem)] mb-2 hover:font-bold h-fit"
              disabled={isOutOfStory}
              aria-label={`Shortcut: ${shortcut}`}
            >
              {shortcut}
            </button>

            <div className="flex flex-col">
              <button
                className="btn btn-xs p-1 w-10"
                onClick={() => onIdeaUp(shortcut)}
                aria-label={t('btn.Move_up')}
              >
                ↑
              </button>

              <button
                className="btn btn-xs p-1 w-10"
                onClick={() => onIdeaDown(shortcut)}
                aria-label={t('btn.Move_down')}
              >
                ↓
              </button>
            </div>
          </div>
        ))}

        {/* FORM */}
        <form className="form-control gap-2 mt-4" onSubmit={onSubmitIdea}>
          <label className="form-control w-full" key={'step-1'}>
            <textarea
              className="textarea textarea-bordered h-5 text-center"
              placeholder={t('textarea_placeholder')}
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
              required
            />
          </label>
          <input className="btn btn-sm w-full" type="submit" value={t('Add_to_My_Shortcuts')} />
        </form>
      </div>
    </div>
  );
}
