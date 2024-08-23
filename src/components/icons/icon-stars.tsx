import type { ComponentProps } from 'react';

export interface IconStarProps extends ComponentProps<'svg'> {
  star1class?: string;
  star2class?: string;
  star3class?: string;
  plus1class?: string;
  plus2class?: string;
  plus3class?: string;
}

export function Stars(props: IconStarProps): JSX.Element {
  const { star1class, star2class, star3class, plus1class, plus2class, plus3class } = props;

  return (
    <svg
      fill="#000000"
      height="200px"
      width="200px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 511.999 511.999"
      xmlSpace="preserve"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <g>
          {' '}
          <g>
            {' '}
            <polygon
              className={star1class}
              points="409.671,119.459 302.13,105.897 256,7.811 209.87,105.897 102.329,119.459 181.36,193.642 161.026,300.11 256,247.871 350.973,300.11 330.64,193.642 "
            ></polygon>{' '}
          </g>{' '}
        </g>{' '}
        <g>
          {' '}
          <g>
            {' '}
            <polygon
              className={star2class}
              points="442.875,354.882 433.808,278.783 380.977,334.298 305.802,319.404 342.273,386.806 304.878,453.7 380.25,439.841 432.315,496.078 442.425,420.111 511.999,387.973 "
            ></polygon>{' '}
          </g>{' '}
        </g>{' '}
        <g>
          {' '}
          <g>
            {' '}
            <polygon
              className={star3class}
              points="169.727,386.806 206.198,319.404 131.023,334.298 78.19,278.782 69.125,354.882 0,387.973 69.574,420.111 79.684,496.078 131.749,439.841 207.122,453.7 "
            ></polygon>{' '}
          </g>{' '}
        </g>{' '}
        <g>
          {' '}
          <g>
            {' '}
            <polygon
              className={plus3class}
              points="272.638,445.723 272.638,420.536 239.362,420.536 239.362,445.723 214.174,445.723 214.174,478.999 239.362,478.999 239.362,504.187 272.638,504.187 272.638,478.999 297.826,478.999 297.826,445.723 "
            ></polygon>{' '}
          </g>{' '}
        </g>{' '}
        <g>
          {' '}
          <g>
            {' '}
            <polygon
              className={plus1class}
              points="75.988,80.122 75.988,54.933 42.713,54.933 42.713,80.122 17.524,80.122 17.524,113.398 42.713,113.398 42.713,138.586 75.988,138.586 75.988,113.398 101.176,113.398 101.176,80.122 "
            ></polygon>{' '}
          </g>{' '}
        </g>{' '}
        <g>
          {' '}
          <g>
            {' '}
            <polygon
              className={plus2class}
              points="469.287,185.371 469.287,160.182 436.012,160.182 436.012,185.371 410.823,185.371 410.823,218.646 436.012,218.646 436.012,243.835 469.287,243.835 469.287,218.646 494.476,218.646 494.476,185.371 "
            ></polygon>{' '}
          </g>{' '}
        </g>{' '}
      </g>
    </svg>
  );
}
