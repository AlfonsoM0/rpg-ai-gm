'use client';
// https://www.sitepoint.com/next-js-internationalization/#implementinglanguageswitching

import React, { useState } from 'react';
import { usePathname } from '@/navigation';
import { Icon } from './icons';
// eslint-disable-next-line no-restricted-imports -- necesary for setup lang
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function LangSwitcher() {
  const t = useTranslations('Header');
  const locale = useTranslations()('[locale]');

  interface Option {
    country: string;
    code: string;
  }

  const router = useRouter();
  const pathname = usePathname();

  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);

  const options: Option[] = [
    { country: 'EN', code: 'en' },
    { country: 'ES', code: 'es' },
  ];

  const setOption = (option: Option) => {
    setIsOptionsExpanded(false);
    router.push(`/${option.code}${pathname}`);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
          onBlur={() => setIsOptionsExpanded(false)}
          aria-label={t('LangSwitcher')}
        >
          <Icon.LanguageIcon className="w-6 h-6" />
        </button>
        <div
          className={`transition-transform duration-500 ease-custom ${
            !isOptionsExpanded
              ? '-translate-y-1/2 scale-y-0 opacity-0'
              : 'translate-y-0 scale-y-100 opacity-100'
          }`}
        >
          <ul className="absolute left-0 right-0 mb-4 divide-y rounded-lg shadow-lg overflow-hidden bg-base-100">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-3 py-2 transition-colors duration-300 hover:bg-primary-content flex items-center cursor-pointer"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setOption(option);
                }}
                onClick={() => setIsOptionsExpanded(false)}
              >
                <p className={locale === option.code ? 'text-success' : ''}>{option.country}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
