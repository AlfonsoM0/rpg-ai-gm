'use client';

import { Icon } from 'components/icons';
import { useEffect, useState } from 'react';

export function Copy({
  text,
  toolTipPosition,
}: {
  text: string;
  toolTipPosition?: 'left' | 'right';
}): JSX.Element {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isCopied) setIsCopied(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [isCopied]);

  const toolTipPositionStyle =
    toolTipPosition === 'left' ? 'tooltip tooltip-left' : 'tooltip tooltip-right';
  return (
    <div
      className={toolTipPosition ? toolTipPositionStyle : 'tooltip'}
      data-tip={`"${text.slice(0, 30)}..."`}
    >
      <button
        className="btn btn-xs btn-ghost hover:badge-success h-5 p-1"
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
