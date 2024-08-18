import { ComponentProps } from 'react';

export default function ChatWindowFrame({ children, ...props }: ComponentProps<'div'>) {
  return (
    <div {...props} className="h-[70vh] w-[90vw] flex flex-col border rounded-xl p-2">
      <div className="overflow-y-scroll">{children}</div>
    </div>
  );
}
