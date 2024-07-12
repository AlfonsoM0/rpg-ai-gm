import CollapseTips from './collapse-tips';
import CollapseMyShortcuts from './collapse-my-shortcuts';
import CollapseShortcuts from './collapse-shortcuts';

export default function ModaIdeasForAI() {
  return (
    <div>
      <h3 className="font-bold text-lg">Tips y Atajos</h3>
      <p className="py-4 text-sm">
        Estos son tips y atajos para ayudarte a mejorar tu experiencia con Game Master AI. <br />
      </p>

      <CollapseTips />

      <CollapseMyShortcuts />

      <CollapseShortcuts />
    </div>
  );
}
