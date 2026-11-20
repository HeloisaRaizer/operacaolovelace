import React from "react";
import ChallengeRoom from "./ChallengeRoom";

export default function Central({
  researcher,
  clues = [],
  onClue,
  onExit,
  onComplete,
}) {
  const location = "central";

  const challenges = (researcher?.challenges || []).filter(
    (challenge) => challenge.location === location
  );

  return (
    <ChallengeRoom
      location={location}
      title="Central de Pesquisa"
      researcher={researcher}
      challenges={challenges}
      clues={clues}
      onClue={onClue}
      onComplete={onComplete}
      onExit={onExit}
    />
  );
}