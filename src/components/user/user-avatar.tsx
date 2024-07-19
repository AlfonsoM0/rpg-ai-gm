'use client';

import { Icon } from 'components/icons';
import useFirebase from 'hooks/firebase';

interface UserAvatarProps {
  w?: number;
  h?: number;
}

export default function UserAvatar({ w = 8, h = 8 }: UserAvatarProps) {
  const { user, isFireLoading } = useFirebase();

  let userIcon = <></>;

  if (isFireLoading) userIcon = <span className="loading loading-spinner loading-xs"></span>;
  else if (user?.photoURL)
    // eslint-disable-next-line @next/next/no-img-element
    userIcon = <img src={user.photoURL} alt={user.displayName || ''} />;
  else userIcon = <Icon.User />;

  const avatarStyle = user?.photoURL ? 'avatar online' : 'avatar offline';
  const iconStyle = `w-${w} h-${h} rounded-full`;
  return (
    <div className={avatarStyle}>
      <div className={iconStyle}>{userIcon}</div>
    </div>
  );
}
