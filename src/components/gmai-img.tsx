import imgGmAi from 'public/gmai.png';
import Image from 'next/image';
import { AI_NAME_TO_SHOW } from 'src/config/constants';

export default function GmAiImag({
  width,
  height,
  priority,
}: {
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <Image
      width={width}
      height={height}
      priority={priority}
      property="AlfonsoM0"
      src={imgGmAi.src}
      alt={AI_NAME_TO_SHOW}
    />
  );
}
