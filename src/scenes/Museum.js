import React from "react";
import ChallengeRoom from "./ChallengeRoom";

export default function Museum({
  researcher,
  clues = [],
  onClue,
  onExit,
  onComplete,
}) {
  const location = "museum";

  const challenges = (researcher?.challenges || []).filter(
    (challenge) => challenge.location === location
  );

  return (
    <ChallengeRoom
      location={location}
      title="Museu da Ciência"
      researcher={researcher}
      challenges={challenges}
      clues={clues}
      onClue={onClue}
      onComplete={onComplete}
      onExit={onExit}
    />
  );
}