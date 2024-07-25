import { ComponentProps } from 'react';

export default function Main(props: ComponentProps<'main'>) {
  return (
    <main
      className="container m-auto mb-8 flex min-h-[calc(100vh-9.4rem)] flex-col items-center justify-between gap-4 mt-16"
      {...props}
    >
      {props.children}
    </main>
  );
}
