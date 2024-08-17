import CardCharacterBody from 'src/components/card-character/card-character-body';
import CardCharacterContainer from 'src/components/card-character/card-character-container';
import { Player } from 'src/types/multiplayer';

export default function CardCharacterLobby({ player }: { player: Player }) {
  return (
    <CardCharacterContainer isSelected={false}>
      <CardCharacterBody character={player.character}>
        <p className="text-center font-bold text-info">Jugado por: {player.userName}</p>
      </CardCharacterBody>
    </CardCharacterContainer>
  );
}
