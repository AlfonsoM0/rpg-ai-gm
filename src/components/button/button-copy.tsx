'use client';

import { Icon } from 'components/icons';
import { useEffect, useState } from 'react';

export function Copy({ text }: { text: string }): JSX.Element {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isCopied) setIsCopied(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [isCopied]);

  return (
    <div className="tooltip" data-tip={`Copiar al portapapeles "${text.slice(0, 50)}..."`}>
      <button
        className="badge bg-secondary-content badge-sm cursor-pointer hover:badge-success h-6 p-2"
        onClick={() => {
          void navigator.clipboard.writeText(text);
          setIsCopied(true);
        }}
        type="button"
      >
        {isCopied ? (
          <Icon.CopySuccess className="w-5 fill-success" />
        ) : (
          <Icon.Copy className="w-5" />
        )}
      </button>
    </div>
  );
}
