import type { ComponentProps } from 'react';

/**
 *
 * Example:
 * className="w-8 h-8 stroke-primary fill-white"
 *
 */
export function Idea(props: ComponentProps<'svg'>): JSX.Element {
  return (
    <svg
      viewBox="0 0 32 32"
      enableBackground="new 0 0 32 32"
      id="Stock_cut"
      version="1.1"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        {' '}
        <desc></desc>{' '}
        <g>
          {' '}
          <path
            d="M17,31h-2 c-1.105,0-2-0.895-2-2v-2h6v2C19,30.105,18.105,31,17,31z"
            fill="none"
            // stroke="#000000"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          ></path>{' '}
          <path
            d="M23,16L23,16 c0,2.518-1.186,4.889-3.2,6.4L19,23v4h-6v-4l-0.8-0.6C10.186,20.889,9,18.518,9,16v0c0-3.866,3.134-7,7-7h0 C19.866,9,23,12.134,23,16z"
            fill="none"
            // stroke="#000000"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          ></path>{' '}
          <line
            fill="none"
            // stroke="#000000"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            x1="16"
            x2="16"
            y1="6"
            y2="2"
          ></line>{' '}
          <line
            fill="none"
            // stroke="#000000"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            x1="8.93"
            x2="6.101"
            y1="8.929"
            y2="6.1"
          ></line>{' '}
          <line
            fill="none"
            // stroke="#000000"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            x1="23.07"
            x2="25.899"
            y1="8.929"
            y2="6.1"
          ></line>{' '}
          <line
            fill="none"
            // stroke="#000000"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            x1="6"
            x2="2"
            y1="16"
            y2="16"
          ></line>{' '}
          <line
            fill="none"
            // stroke="#000000"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            x1="26"
            x2="30"
            y1="16"
            y2="16"
          ></line>{' '}
        </g>{' '}
      </g>
    </svg>
  );
}
