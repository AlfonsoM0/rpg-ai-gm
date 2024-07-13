'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { useUserPreferencesStore } from 'hooks/use-user-preferences-store';
import { useState } from 'react';

export default function CollapseMyShortcuts() {
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

  function handleClick(idea: string) {
    addContent({
      role: 'user',
      parts: [{ text: idea }],
    });
    setModalIsOpen(false);
  }

  return (
    <div className="collapse collapse-plus">
      <input type="radio" name="tips-y-atajos" defaultChecked />
      <div className="collapse-title text-xl font-medium">Mis Atajos</div>
      <div className="collapse-content">
        {/* My shortcuts */}
        {chatShortcuts.map((shortcut, index) => (
          <div key={index} className="flex gap-2 justify-between">
            <button className="btn btn-error p-1" onClick={() => removeChatShortcut(shortcut)}>
              X
            </button>
            <button
              onClick={() => handleClick(shortcut)}
              className="btn w-[calc(100%-4rem)] mb-2 hover:font-bold h-fit"
            >
              {shortcut}
            </button>
            <div className="flex flex-col">
              <button className="btn btn-xs p-1 w-10" onClick={() => onIdeaUp(shortcut)}>
                ↑
              </button>
              <button className="btn btn-xs p-1 w-10" onClick={() => onIdeaDown(shortcut)}>
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
              placeholder="Escribe un comando para GmAi."
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
              required
            />
          </label>
          <input className="btn btn-sm w-full" type="submit" value="Agregar a Mis Atajos" />
        </form>
      </div>
    </div>
  );
}