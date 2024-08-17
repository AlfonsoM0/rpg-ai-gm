'use client';

import Markdown from 'markdown-to-jsx';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { MarkdownOptions } from 'src/config/constants';
import { Character } from 'src/types/character';
import { characteristicsXpValue } from 'src/utils/characteristics-xp-value';

export default function CardCharacterBody({
  character,
  children,
}: {
  character: Character;
  children: React.ReactNode;
}) {
  const c = useTranslations('Character.char');
  const d = useTranslations('Character');

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

  return (
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

      {children}
    </div>
  );
}
