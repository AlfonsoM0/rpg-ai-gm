import { ComponentProps } from 'react';

export default function Main(props: ComponentProps<'main'>) {
  return (
    <main
      className="container m-auto mb-8 flex min-h-screen flex-col items-center justify-between gap-4"
      {...props}
    >
      {props.children}
    </main>
  );
}
