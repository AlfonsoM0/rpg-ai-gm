'use client';

import { useEffect, useState } from 'react';
import { Icon } from '../icons';
import { IconStarProps } from '../icons/icon-stars';

interface LoadingIconStarsProps extends IconStarProps {
  isloading?: boolean;
  interval?: number;
}

type LoadingStarsConfig = {
  iconBaseFill?: string;
  star1class?: string;
  star2class?: string;
  star3class?: string;
  plus1class?: string;
  plus2class?: string;
  plus3class?: string;
};

const starsCongfig: LoadingStarsConfig[] = [
  {
    iconBaseFill: 'fill-info',
    star1class: 'fill-error animate-pulse',
    star2class: 'fill-transparent',
    star3class: '',
    plus1class: 'fill-transparent',
    plus2class: '',
    plus3class: 'fill-error animate-pulse',
  },
  {
    iconBaseFill: 'fill-primary',
    star1class: '',
    star2class: 'fill-warning animate-pulse',
    star3class: 'fill-transparent',
    plus1class: 'fill-warning animate-pulse',
    plus2class: 'fill-transparent',
    plus3class: '',
  },
  {
    iconBaseFill: 'fill-secondary',
    star1class: 'fill-transparent',
    star2class: '',
    star3class: 'fill-success animate-pulse',
    plus1class: '',
    plus2class: 'fill-success animate-pulse',
    plus3class: 'fill-transparent',
  },

  {
    iconBaseFill: 'fill-primary',
    star1class: 'fill-warning animate-pulse',
    star2class: 'fill-transparent',
    star3class: '',
    plus1class: 'fill-transparent',
    plus2class: '',
    plus3class: 'fill-warning animate-pulse',
  },
  {
    iconBaseFill: 'fill-secondary',
    star1class: '',
    star2class: 'fill-success animate-pulse',
    star3class: 'fill-transparent',
    plus1class: 'fill-success animate-pulse',
    plus2class: 'fill-transparent',
    plus3class: '',
  },
  {
    iconBaseFill: 'fill-info',
    star1class: 'fill-transparent',
    star2class: '',
    star3class: 'fill-error animate-pulse',
    plus1class: '',
    plus2class: 'fill-error animate-pulse',
    plus3class: 'fill-transparent',
  },

  {
    iconBaseFill: 'fill-secondary',
    star1class: 'fill-success animate-pulse',
    star2class: 'fill-transparent',
    star3class: '',
    plus1class: 'fill-transparent',
    plus2class: '',
    plus3class: 'fill-success animate-pulse',
  },
  {
    iconBaseFill: 'fill-info',
    star1class: '',
    star2class: 'fill-error animate-pulse',
    star3class: 'fill-transparent',
    plus1class: 'fill-error animate-pulse',
    plus2class: 'fill-transparent',
    plus3class: '',
  },
  {
    iconBaseFill: 'fill-primary',
    star1class: 'fill-transparent',
    star2class: '',
    star3class: 'fill-warning animate-pulse',
    plus1class: '',
    plus2class: 'fill-warning animate-pulse',
    plus3class: 'fill-transparent',
  },
];

export default function IconStars(props: LoadingIconStarsProps) {
  const { isloading = true, interval = 1000, className } = props;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % starsCongfig.length);
    }, interval);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { iconBaseFill, star1class, star2class, star3class, plus1class, plus2class, plus3class } =
    starsCongfig[index];

  if (isloading)
    return (
      <Icon.Stars
        {...props}
        className={`${className} ${iconBaseFill}`}
        star1class={star1class}
        star2class={star2class}
        star3class={star3class}
        plus1class={plus1class}
        plus2class={plus2class}
        plus3class={plus3class}
      />
    );

  return <Icon.Stars {...props} />;
}
