import { Icon } from 'components/icons';
import React, { ComponentProps, CSSProperties } from 'react';

interface SearchProps extends ComponentProps<'input'> {
  labelclassname?: string;
  iconclassname?: string;
}

export default function Search(props: SearchProps) {
  return (
    <label className={`input input-bordered flex items-center gap-2 w-fit ${props.labelclassname}`}>
      <input type="text" className="grow" placeholder="Search" {...props} />

      <Icon.Search />
    </label>
  );
}
