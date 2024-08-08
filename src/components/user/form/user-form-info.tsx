'use client';

import useFirebase from 'hooks/firebase';
import { useRouter } from '@/navigation';
import { useEffect, useState } from 'react';
import { UserAccuntPartial } from 'types/firebase-db';
import { useTranslations } from 'next-intl';

export default function UserFormInfo() {
  const t = useTranslations('User.form');

  const router = useRouter();
  const { updateUserProfile, isFireLoading } = useFirebase();

  const [userAcc, setUserAcc] = useState<UserAccuntPartial>({});
  const [errorMsg, setErrorMsg] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    if (userAcc.displayName && userAcc.displayName.length < 3) return setErrorMsg(t('err_Name'));

    // userAcc.photoURL mus be a valid image url.
    if (userAcc.photoURL && /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(userAcc.photoURL) === false)
      return setErrorMsg(t('err_URL'));

    updateUserProfile(userAcc);

    setUserAcc({});

    router.push('/');
  }

  useEffect(() => {
    setErrorMsg('');
  }, [userAcc]);

  return (
    <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={t('input_New_Name')}
        className="input input-bordered w-full text-center"
        value={userAcc.displayName || ''}
        onChange={(e) => setUserAcc({ ...userAcc, displayName: e.target.value })}
        disabled={isFireLoading}
      />
      <input
        type="url"
        placeholder={t('input_Img_profile_URL')}
        className="input input-bordered w-full text-center text-xs"
        value={userAcc.photoURL || ''}
        onChange={(e) => setUserAcc({ ...userAcc, photoURL: e.target.value })}
        disabled={isFireLoading}
      />

      <p className="text-xs text-error text-center">{errorMsg ? errorMsg : null}</p>

      <button
        className="btn btn-primary"
        type="submit"
        disabled={isFireLoading}
        aria-label={t('btn_Save')}
      >
        {isFireLoading ? <span className="loading loading-spinner"></span> : t('btn_Save')}
      </button>
    </form>
  );
}
