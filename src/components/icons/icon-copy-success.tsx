import type { ComponentProps } from 'react';

export function CopySuccess(props: ComponentProps<'svg'>): JSX.Element {
  return (
    <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M22 11.1V6.9C22 3.4 20.6 2 17.1 2H12.9C9.4 2 8 3.4 8 6.9V8H11.1C14.6 8 16 9.4 16 12.9V16H17.1C20.6 16 22 14.6 22 11.1Z"
          stroke="#292D32"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />{' '}
        <path
          d="M16 17.1V12.9C16 9.4 14.6 8 11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1Z"
          stroke="#292D32"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />{' '}
        <path
          d="M6.08008 15L8.03008 16.95L11.9201 13.05"
          stroke="#292D32"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />{' '}
      </g>
    </svg>
  );
}
