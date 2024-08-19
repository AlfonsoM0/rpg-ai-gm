'use client';

import useFirebase from 'src/hooks/firebase';
import useMultiplayer, { usePlayerAcctions } from 'src/hooks/multiplayer';
import useGenerateAiConfigObj from 'src/hooks/use-generate-ai-config-model';
import { useRouter } from 'src/navigation';
import { MultiplayerStory } from 'src/types/multiplayer';

export default function MultiplayerJoinCollapse({ game }: { game: MultiplayerStory }) {
  const { storyName, userCratorName, aiRole, aiConfig, storyDescription, locale, storyId } = game;
  const aiConfigObj = useGenerateAiConfigObj();
  const aiConfigTitle = aiConfigObj.find((obj) => obj.name === aiConfig)!.title;

  const { characterSelected, isMultiplayerLoading } = useMultiplayer();
  const { isFireLoading } = useFirebase();
  const { joinGame } = usePlayerAcctions();
  const router = useRouter();

  function onJoinClick() {
    if (!characterSelected) return;
    joinGame(game, characterSelected).then(() => {
      router.push('/multiplayer/lobby');
    });
  }

  const isAiGM = game.aiRole === 'Game Master';
  const isBtnDisable = isMultiplayerLoading || isFireLoading || !characterSelected;

  return (
    <div className="collapse w-full bg-primary-content">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium text-center">
        {storyName} ({locale}) | Por {userCratorName} | Jugadores: {game.players.length}
      </div>
      <div className="collapse-content">
        <h3 className="font-bold text-lg">{storyName}</h3>
        <p>{storyDescription}</p>

        <p className="my-4">
          <strong>Creada por:</strong> {userCratorName}.
        </p>
        <p className="mb-4">
          <strong>{isAiGM ? 'Anfitrión' : 'Anfitrión/Game Master'}:</strong>{' '}
          {game.players[0].userName}.
        </p>
        <p className="mb-4">
          <strong>Jugadores:</strong> {game.players.map((p) => p.userName).join(', ')}.
        </p>
        <p className="mb-4">
          <strong>GmAi:</strong> {aiRole} | {aiConfigTitle}
        </p>

        <hr />

        <button className="btn btn-success w-full" onClick={onJoinClick} disabled={isBtnDisable}>
          UNIRSE
        </button>
      </div>
    </div>
  );
}
