'use client';

import { useCharacterStore } from 'hooks/use-character-store';
import { useMemo, useState } from 'react';
import { Character } from 'types/character';
import { characteristicsXpValue } from 'utils/characteristics-xp-value';
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import ButtonShareCharacter from './card-character-buttons/button-share-character';
import ButtonCopyCharacter from './card-character-buttons/button-copy-character';
import ButtonDeleteCharacter from './card-character-buttons/button-delete-character';
import ButtonEditCharacter from './card-character-buttons/button-edit-character';
import ButtonSelectCharacter from './card-character-buttons/button-select-character';

interface CardCharacterProps {
  character: Character;
  isViewOnly?: boolean;
  isFromAnotherUser?: boolean;
}

export default function CardCharacter({
  character,
  isViewOnly,
  isFromAnotherUser,
}: CardCharacterProps) {
  const { inGameCharacters } = useCharacterStore();

  const {
    id,
    xp,
    name,
    appearance,
    background,
    profession,
    personality,
    equipment,
    powers,
    characteristics,
  } = character;
  const { strength, dexterity, constitution, intelligence, wisdom, charisma } = characteristics;

  const CharsXP = useMemo(() => characteristicsXpValue(characteristics), [characteristics]);
  const [check, setCheck] = useState(false);

  const isInGame = useMemo(
    () => Boolean(inGameCharacters.find((c) => c.id === id)),
    [inGameCharacters, id]
  );

  const borderStyle = isInGame
    ? 'card w-80 border-2 border-success rounded-lg shadow-xl'
    : 'card w-80 border border-primary-content rounded-lg shadow-xl';

  return (
    <div className={borderStyle}>
      <div className="card-body p-2">
        <div className="flex justify-between items-center h-14 gap-4">
          <div>
            <h2 className="card-title">{name}</h2>
          </div>
          <div>
            <p className="text-xs text-info">
              <strong>XP: </strong> {CharsXP}/{xp}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center font-bold gap-10">
          <div>
            <h3>FUE +{strength}</h3>
            <h3>DES +{dexterity}</h3>
            <h3>CON +{constitution}</h3>
          </div>
          <div>
            <h3>INT +{intelligence}</h3>
            <h3>SAB +{wisdom}</h3>
            <h3>CAR +{charisma}</h3>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200" onClick={() => setCheck(!check)}>
          <input type="radio" name={id} checked={check} readOnly />
          <div className="collapse-title font-medium">Descripción</div>
          <div className="collapse-content">
            <h3>
              <strong>Apariencia: </strong>
            </h3>
            <Markdown options={mdOpt}>{appearance}</Markdown>
            <br />

            <h3>
              <strong>Trasfondo: </strong>
            </h3>
            <Markdown options={mdOpt}>{background}</Markdown>
            <br />

            <h3>
              <strong>Profesión: </strong>
            </h3>
            <Markdown options={mdOpt}>{profession}</Markdown>
            <br />

            <h3>
              <strong>Personalidad: </strong>
            </h3>
            <Markdown options={mdOpt}>{personality}</Markdown>
            <br />

            <h3>
              <strong>Equipamiento: </strong>
            </h3>
            <Markdown options={mdOpt}>{equipment}</Markdown>
            <br />

            <h3>
              <strong>Poderes: </strong>
            </h3>
            <Markdown options={mdOpt}>{powers ? powers : 'No posee poderes.'}</Markdown>
            <br />
          </div>
        </div>

        {isViewOnly ? null : (
          <div className="card-actions justify-between">
            <ButtonDeleteCharacter character={character} />

            <ButtonEditCharacter character={character} />

            <ButtonSelectCharacter character={character} />
          </div>
        )}

        <div className="card-actions justify-center">
          {isFromAnotherUser ? (
            <ButtonCopyCharacter character={character} />
          ) : (
            <ButtonShareCharacter character={character} />
          )}
        </div>
      </div>
    </div>
  );
}

const mdOpt: MarkdownToJSX.Options = {
  overrides: {
    strong: {
      props: { className: 'text-info text-md' },
    },
    li: {
      props: { className: 'list-disc ml-5' },
    },
    p: {
      props: { className: 'my-2' },
    },
    a: {
      props: { className: 'text-info' },
    },
    pre: {
      component: 'div',
    },
    code: {
      component: Markdown,
    },
  },
};

export const Skeleton_CardCharacter = () => (
  <div className="flex w-80 flex-col gap-4">
    <div className="flex items-center gap-4">
      <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
      <div className="flex flex-col gap-4">
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-4 w-28"></div>
      </div>
    </div>
    <div className="skeleton h-44 w-full"></div>
  </div>
);
