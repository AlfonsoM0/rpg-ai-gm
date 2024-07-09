import { ComponentProps } from 'react';

export default function H2(props: ComponentProps<'h1'>) {
  return (
    <h2
      {...props}
      className={`my-6 text-center text-2xl text-info font-extrabold  ${props.className}`}
    >
      {props.children}
    </h2>
  );
}
