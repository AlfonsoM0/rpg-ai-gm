import { ComponentProps } from 'react';

export default function H1(props: ComponentProps<'h1'>) {
  return (
    <h1
      {...props}
      className={`my-8 text-center text-3xl text-info font-extrabold ${props.className}`}
    >
      {props.children}
    </h1>
  );
}
