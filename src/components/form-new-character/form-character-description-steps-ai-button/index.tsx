'use client';

import FormStep from './form-step';

export default function AiButtonImproveCaracterDescription({ step }: { step: number }) {
  const steps = [
    <div key={'step-0-name'}></div>,

    <FormStep descriptionType="appearance" key={'appearance'} />,

    <FormStep descriptionType="background" key={'background'} />,

    <FormStep descriptionType="profession" key={'profession'} />,

    <FormStep descriptionType="personality" key={'personality'} />,

    <FormStep descriptionType="equipment" key={'equipment'} />,

    <FormStep descriptionType="powers" key={'powers'} />,

    <div key={'step-7-characteristics'}></div>,
  ];

  return steps[step];
}
