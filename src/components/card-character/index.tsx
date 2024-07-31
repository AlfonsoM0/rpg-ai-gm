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
import { useTranslations } from 'next-intl';
import { MarkdownOptions } from 'config/constants';

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
  const d = useTranslations('Character');
  const c = useTranslations('Character.char');

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
            <h3>
              {c('STR')} +{strength}
            </h3>
            <h3>
              {c('DEX')} +{dexterity}
            </h3>
            <h3>
              {c('CON')} +{constitution}
            </h3>
          </div>
          <div>
            <h3>
              {c('INT')} +{intelligence}
            </h3>
            <h3>
              {c('WIS')} +{wisdom}
            </h3>
            <h3>
              {c('CHA')} +{charisma}
            </h3>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200" onClick={() => setCheck(!check)}>
          <input type="radio" name={id} checked={check} readOnly />
          <div className="collapse-title font-medium">{d('Description')}</div>
          <div className="collapse-content">
            <h3>
              <strong>{d('Appearance')}: </strong>
            </h3>
            <Markdown options={MarkdownOptions}>{appearance}</Markdown>
            <br />

            <h3>
              <strong>{d('Background')}: </strong>
            </h3>
            <Markdown options={MarkdownOptions}>{background}</Markdown>
            <br />

            <h3>
              <strong>{d('Profession')}: </strong>
            </h3>
            <Markdown options={MarkdownOptions}>{profession}</Markdown>
            <br />

            <h3>
              <strong>{d('Personality')}: </strong>
            </h3>
            <Markdown options={MarkdownOptions}>{personality}</Markdown>
            <br />

            <h3>
              <strong>{d('Equipment')}: </strong>
            </h3>
            <Markdown options={MarkdownOptions}>{equipment}</Markdown>
            <br />

            <h3>
              <strong>{d('Powers')}: </strong>
            </h3>
            <Markdown options={MarkdownOptions}>{powers ? powers : '-'}</Markdown>
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
