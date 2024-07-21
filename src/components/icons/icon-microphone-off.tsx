import type { ComponentProps } from 'react';

export function MicrophoneOff(props: ComponentProps<'svg'>): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M16 10.4V7.00003C16 4.79089 14.2091 3.00003 12 3.00003C11.0406 3.00003 10.1601 3.3378 9.47086 3.90092M4 12V13C4 17.4183 7.58172 21 12 21C14.4653 21 16.6701 19.8849 18.1376 18.1316M3 3L21 21M12 17C9.79086 17 8 15.2092 8 13V8.00003L15.2815 15.288C14.5585 16.323 13.3583 17 12 17Z"
          // stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
      </g>
    </svg>
  );
}
