'use client';

import useMultiplayer, { usePlayerAcctions } from 'src/hooks/multiplayer';
import useGenerateAiConfigObj from 'src/hooks/use-generate-ai-config-model';
import { useRouter } from 'src/navigation';
import { MultiplayerStory } from 'src/types/multiplayer';

export default function MultiplayerJoinCollapse({ game }: { game: MultiplayerStory }) {
  const { storyName, userHostName, aiRole, aiConfig, storyDescription, locale, storyId } = game;
  const aiConfigObj = useGenerateAiConfigObj();
  const aiConfigTitle = aiConfigObj.find((obj) => obj.name === aiConfig)!.title;

  const { characterSelected } = useMultiplayer();
  const { joinGame } = usePlayerAcctions();
  const router = useRouter();

  function onJoinClick() {
    if (!characterSelected) return;
    joinGame(storyId, characterSelected).then(() => {
      router.push('/multiplayer/lobby');
    });
  }

  return (
    <div className="collapse w-full bg-primary-content">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium text-center">
        {storyName} ({locale}) | Por {userHostName}
      </div>
      <div className="collapse-content">
        <p className="mb-4">
          <strong>Anfitrión:</strong> {userHostName}
        </p>
        <p className="mb-4">
          <strong>GmAi:</strong> {aiRole} | {aiConfigTitle}
        </p>

        <h3 className="font-bold text-lg">{storyName}</h3>
        <p>{storyDescription}</p>

        <hr />

        <button className="btn btn-ghost w-full" onClick={onJoinClick}>
          Unirse
        </button>
      </div>
    </div>
  );
}
