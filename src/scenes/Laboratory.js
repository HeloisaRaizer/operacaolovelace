import React from "react";
import ChallengeRoom from "./ChallengeRoom";

export default function Laboratory({
  researcher,
  clues = [],
  onClue,
  onExit,
  onComplete,
}) {
  const location = "laboratory";

  const challenges = (researcher?.challenges || []).filter(
    (challenge) => challenge.location === location
  );

  return (
    <ChallengeRoom
      location={location}
      title="Laboratório"
      researcher={researcher}
      challenges={challenges}
      clues={clues}
      onClue={onClue}
      onComplete={onComplete}
      onExit={onExit}
    />
  );
}