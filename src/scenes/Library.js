import React from "react";
import ChallengeRoom from "./ChallengeRoom";

export default function Library({
  researcher,
  clues = [],
  onClue,
  onExit,
  onComplete,
}) {
  const location = "library";

  const challenges = (researcher?.challenges || []).filter(
    (challenge) => challenge.location === location
  );

  const labels = {
    Library: "Biblioteca",
    Museum: "Museu da Ciência",
    Laboratory: "Laboratório",
    Central: "Central de Pesquisa",
  };

  return (
    <ChallengeRoom
      location={location}
      title={labels.Library}
      researcher={researcher}
      challenges={challenges}
      clues={clues}
      onClue={onClue}
      onComplete={onComplete}
      onExit={onExit}
    />
  );
}