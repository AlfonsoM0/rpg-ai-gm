import { Icon } from 'components/icons';
import { ComponentProps } from 'react';

export default function Search(props: ComponentProps<'input'>) {
  return (
    <label className="input input-bordered flex items-center gap-2">
      <input type="text" className="grow" placeholder="Search" {...props} />

      <Icon.Search />
    </label>
  );
}
