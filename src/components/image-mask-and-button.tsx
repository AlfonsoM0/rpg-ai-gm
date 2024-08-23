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
    <button onClick={onClickBtn} aria-label={alt}>
      <Link
        className="flex flex-col items-center hover:cursor-pointer hover:brightness-125"
        href={linkUrl}
      >
        <Image
          className="max-w-xs mask mask-hexagon"
          src={src}
          alt={alt}
          width={320}
          height={320}
        />

        <div className="mt-[-5rem] mb-10" style={{ zIndex: 1 }}>
          <p className="text-lg font-extrabold text-white tex-shadow-around-black">{alt}</p>
        </div>
      </Link>
    </button>
  );
}
