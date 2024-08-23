import { Link } from 'src/navigation';
import Image from 'next/image';

export default function ImgMaskAndButton({
  src,
  alt,
  onClickBtn,
  linkUrl = '#',
}: {
  src: string;
  alt: string;
  onClickBtn?: () => void;
  linkUrl?: string;
}) {
  return (
    <Link className="flex flex-col items-center" href={linkUrl} onClick={onClickBtn}>
      <Image
        className="max-w-xs mask mask-hexagon hover:cursor-pointer hover:brightness-125"
        src={src}
        alt={alt}
        width={320}
        height={320}
      />

      <div className="mt-[-5rem] mb-10" style={{ zIndex: 1 }}>
        <p className="text-lg font-extrabold text-white tex-shadow-around-black">{alt}</p>
      </div>
    </Link>
  );
}
