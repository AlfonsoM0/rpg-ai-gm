'use client';

import { Icon } from 'components/icons';
import { useTranslations } from 'next-intl';

export default function DescriptionIdeas({ ideas }: { ideas: string[] }) {
  const t = useTranslations('New_Character');

  return (
    <details className="dropdown dropdown-left">
      <summary className="btn btn-xs btn-ghost">
        <Icon.Idea className="w-4 h-4 stroke-info" />
      </summary>

      <div className="dropdown-content bg-base-100 rounded-box z-[1] w-72 p-2 shadow border">
        <p className="text-center text-info">{t('Ideas')}</p>

        <ul className="list-disc">
          {ideas.map((idea, i) => (
            <li key={i} className="my-2 ml-4">
              <p>{idea}</p>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
