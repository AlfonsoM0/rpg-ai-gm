import { useTranslations } from 'next-intl';
import esJson from '../content/es.json';

type MsgOptions = keyof typeof esJson;

export default function useI18n(componentName: MsgOptions) {
  const t = useTranslations(componentName);

  type MsgOp2 = keyof (typeof esJson)[MsgOptions];

  return t<MsgOp2>;
}
