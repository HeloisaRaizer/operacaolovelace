import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Library from "./scenes/Library";
import Museum from "./scenes/Museum";
import Laboratory from "./scenes/Laboratory";
import Central from "./scenes/Central";
import researchers from "./researchers";
import "./App.css";

const shuffle = (items) => {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const clamp = (value, min, max) =>
  Math.max(min, Math.min(max, value));

// Áreas onde os pés da Ada podem ficar.
// Coordenadas em porcentagem da imagem da cidade.
const WALKABLE_AREAS = [
  // Rua horizontal
  { left: 9, right: 91, top: 57, bottom: 71 },

  // Rua central que leva à parte superior
  { left: 35, right: 56, top: 30, bottom: 71 },

  // Continuação da rua para a parte inferior
  { left: 44, right: 59, top: 69, bottom: 88 },
];

const canWalk = (x, y) =>
  WALKABLE_AREAS.some(
    (area) =>
      x >= area.left &&
      x <= area.right &&
      y >= area.top &&
      y <= area.bottom
  );

const INITIAL_PLAYER = { x: 50, y: 65 };

const CITY_CLUE_POSITIONS = [
  { x: 47, y: 42 },
  { x: 52, y: 80 },
  { x: 62, y: 64 },
  { x: 31, y: 65 },
  { x: 50, y: 32 },
];

const LIBRARY_CLUE_POSITIONS = [
  { x: 18, y: 42 },
  { x: 35, y: 65 },
  { x: 52, y: 38 },
  { x: 70, y: 62 },
  { x: 84, y: 42 },
];

const randomizeResearcher = (researcher) => {
  const cityPositions = shuffle(CITY_CLUE_POSITIONS);
  const libraryPositions = shuffle(LIBRARY_CLUE_POSITIONS);

  return {
    ...researcher,

    cityClues: (researcher.cityClues || []).map(
      (clue, index) => ({
        ...clue,
        ...cityPositions[index % cityPositions.length],
      })
    ),

    libraryClues: (researcher.libraryClues || []).map(
      (clue, index) => ({
        ...clue,
        ...libraryPositions[index % libraryPositions.length],
      })
    ),
  };
};

const LAB_CLUE = {
  id: "laboratorio-evidencia",
  title: "Relatório de análise do laboratório",
  text:
    "O laboratório confirmou que as informações precisam ser comparadas, analisadas e validadas antes de uma conclusão.",
};

const CENTRAL_CLUE = {
  id: "central-evidencia",
  title: "Mensagem secreta decifrada",
  text:
    "A central confirmou que a mensagem aponta para o Museu da Ciência. A sequência de códigos foi decifrada com sucesso.",
};

function Credits() {
  return (
    <footer className="lovelace-credits">
      <strong>STEAMULANDO FUTUROS 2026</strong>

      <span>
        Desenvolvido por Eduarda Vieira, Heloisa Raizer e
        Maria Luiza Hammes Bassegio da Silva
      </span>
    </footer>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [player, setPlayer] = useState(INITIAL_PLAYER);

  const [researcherDeck, setResearcherDeck] = useState([]);
  const [currentResearcher, setCurrentResearcher] =
    useState(null);

  const [caseNumber, setCaseNumber] = useState(1);
  const [clues, setClues] = useState([]);

  const [journalOpen, setJournalOpen] = useState(false);
  const [selectedClue, setSelectedClue] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [introOpen, setIntroOpen] = useState(false);

  const allClues = useMemo(() => {
    if (!currentResearcher) return [];

    return [
      ...(currentResearcher.cityClues || []),
      ...(currentResearcher.libraryClues || []),
      LAB_CLUE,
      CENTRAL_CLUE,
    ];
  }, [currentResearcher]);

  const foundIds = useMemo(
    () => new Set(clues.map((clue) => clue.id)),
    [clues]
  );

  const libraryClues = currentResearcher?.libraryClues || [];

  const libraryDone =
    libraryClues.length > 0 &&
    libraryClues.every((clue) => foundIds.has(clue.id));

  const allEvidenceFound =
    allClues.length > 0 &&
    allClues.every((clue) => foundIds.has(clue.id));

  const cityLocations = useMemo(() => {
    if (!currentResearcher) return [];

    return [
      {
        id: "library",
        name: "BIBLIOTECA",
        x: 39,
        y: 55,
        type: "library",
      },
      {
        id: "museum",
        name: "MUSEU DA CIÊNCIA",
        x: 72,
        y: 61,
        type: "museum",
      },
      {
        id: "laboratory",
        name: "LABORATÓRIO",
        x: 21,
        y: 67,
        type: "laboratory",
      },
      {
        id: "central",
        name: "CENTRAL DE CÓDIGOS",
        x: 82,
        y: 67,
        type: "central",
      },
      ...(currentResearcher.cityClues || []).map(
        (clue) => ({
          ...clue,
          type: "clue",
        })
      ),
    ];
  }, [currentResearcher]);

  const isLocationComplete = useCallback(
    (location) => {
      if (location.type === "library") {
        return libraryDone;
      }

      if (location.type === "laboratory") {
        return foundIds.has(LAB_CLUE.id);
      }

      if (location.type === "central") {
        return foundIds.has(CENTRAL_CLUE.id);
      }

      if (location.type === "museum") {
        return false;
      }

      return foundIds.has(location.id);
    },
    [libraryDone, foundIds]
  );

  const resetCase = () => {
    setClues([]);
    setPlayer({ ...INITIAL_PLAYER });
    setJournalOpen(false);
    setSelectedClue(null);
    setSelectedAnswer("");
    setFeedback("");
    setIntroOpen(true);
    setScreen("city");
  };

  const startFirstCase = () => {
    const deck = shuffle(researchers);

    if (!deck.length) return;

    setResearcherDeck(deck.slice(1));
    setCurrentResearcher(randomizeResearcher(deck[0]));
    setCaseNumber(1);
    resetCase();
  };

  const startNextCase = () => {
    if (researcherDeck.length === 0) {
      setCurrentResearcher(null);
      setScreen("gameComplete");
      return;
    }

    setCurrentResearcher(
      randomizeResearcher(researcherDeck[0])
    );

    setResearcherDeck((previous) => previous.slice(1));
    setCaseNumber((previous) => previous + 1);

    resetCase();
  };

  const addClue = useCallback((clue) => {
    if (!clue?.id) return;

    setClues((previous) => {
      if (previous.some((item) => item.id === clue.id)) {
        return previous;
      }

      return [...previous, clue];
    });
  }, []);

  // Movimento sem atravessar estruturas.
  const movePlayer = useCallback((key) => {
    const directions = {
      arrowup: [0, -1],
      w: [0, -1],
      arrowdown: [0, 1],
      s: [0, 1],
      arrowleft: [-1, 0],
      a: [-1, 0],
      arrowright: [1, 0],
      d: [1, 0],
    };

    const direction = directions[key.toLowerCase()];

    if (!direction) return;

    const SPEED = 1.7;

    setPlayer((previous) => {
      const nextX = clamp(
        previous.x + direction[0] * SPEED,
        0,
        100
      );

      const nextY = clamp(
        previous.y + direction[1] * SPEED,
        0,
        100
      );

      // Só permite andar se o destino for uma rua.
      if (canWalk(nextX, nextY)) {
        return { x: nextX, y: nextY };
      }

      // Caso contrário, permanece na posição atual.
      return previous;
    });
  }, []);

  const openLocation = useCallback(
    (location) => {
      if (!location || isLocationComplete(location)) {
        return;
      }

      if (location.type === "library") {
        setScreen("library");
        return;
      }

      if (location.type === "museum") {
        setScreen("museum");
        return;
      }

      if (location.type === "laboratory") {
        setScreen("laboratory");
        return;
      }

      if (location.type === "central") {
        setScreen("central");
        return;
      }

      if (location.type === "clue") {
        setSelectedClue(location);
      }
    },
    [isLocationComplete]
  );

  const interact = useCallback(() => {
    if (
      !currentResearcher ||
      introOpen ||
      journalOpen ||
      selectedClue
    ) {
      return;
    }

    const nearbyLocations = cityLocations
      .filter((location) => !isLocationComplete(location))
      .map((location) => ({
        ...location,
        distance: Math.hypot(
          player.x - location.x,
          player.y - location.y
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    const nearest = nearbyLocations[0];

    if (nearest && nearest.distance <= 13) {
      openLocation(nearest);
    }
  }, [
    currentResearcher,
    introOpen,
    journalOpen,
    selectedClue,
    cityLocations,
    player,
    isLocationComplete,
    openLocation,
  ]);

  useEffect(() => {
    if (screen !== "city") return undefined;

    const keyDown = (event) => {
      const key = event.key.toLowerCase();

      const movementKeys = [
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
        "w",
        "a",
        "s",
        "d",
      ];

      if (movementKeys.includes(key)) {
        event.preventDefault();

        if (!introOpen && !journalOpen && !selectedClue) {
          movePlayer(key);
        }
      }

      if (key === "e" || key === " ") {
        event.preventDefault();
        interact();
      }

      if (key === "escape") {
        setSelectedClue(null);
        setJournalOpen(false);
      }
    };

    window.addEventListener("keydown", keyDown);

    return () =>
      window.removeEventListener("keydown", keyDown);
  }, [
    screen,
    movePlayer,
    interact,
    introOpen,
    journalOpen,
    selectedClue,
  ]);

  const handleAnswer = () => {
    if (selectedAnswer === "") {
      setFeedback("Selecione uma hipótese antes de confirmar.");
      return;
    }

    if (
      Number(selectedAnswer) ===
      Number(currentResearcher.answer)
    ) {
      setFeedback("");
      setScreen("result");
    } else {
      setFeedback(
        "Essa hipótese não combina com as evidências. Revise o caderno e tente novamente."
      );
    }
  };

  if (screen === "home") {
    return (
      <main className="home-screen">
        <div className="home-content">
          <span className="eyebrow">
            STEAMULANDO • JOGO DE INVESTIGAÇÃO
          </span>

          <h1>
            OPERAÇÃO
            <br />
            LOVELACE
          </h1>

          <p>
            Uma investigação pela cidade. Pistas escondidas.
            Uma mente brilhante para encontrar.
          </p>

          <img
            className="home-ada"
            src={`${process.env.PUBLIC_URL}/personagens/ada.png`}
            alt="Ada Lovelace"
          />

          <button
            className="start-button"
            onClick={startFirstCase}
          >
            INICIAR NOVA INVESTIGAÇÃO
          </button>

          <small>EXPLORE · INVESTIGUE · DESCUBRA</small>

          <Credits />
        </div>
      </main>
    );
  }

  if (screen === "gameComplete") {
    return (
      <main className="result-screen">
        <section className="result-card game-complete-card">
          <span className="eyebrow">OPERAÇÃO LOVELACE</span>

          <div className="completion-star">★</div>

          <h1>Você concluiu a investigação!</h1>

          <p>
            Todos os casos foram solucionados. As histórias
            e contribuições dessas pesquisadoras agora fazem
            parte do arquivo da Operação Lovelace.
          </p>

          <p className="completion-message">
            Parabéns, detetive. Missão cumprida!
          </p>

          <button
            className="start-button"
            onClick={startFirstCase}
          >
            JOGAR NOVAMENTE
          </button>

          <button
            className="close-button"
            onClick={() => setScreen("home")}
          >
            VOLTAR AO INÍCIO
          </button>
        </section>
      </main>
    );
  }

  if (!currentResearcher) {
    return (
      <div className="loading-screen">
        Preparando investigação...
      </div>
    );
  }

  return (
    <div className="app">
      {screen === "city" && (
        <main className="game-screen">
          <header className="game-header">
            <div>
              <span className="eyebrow">
                OPERAÇÃO LOVELACE
              </span>

              <h2>
                CASO {String(caseNumber).padStart(3, "0")} ·{" "}
                {currentResearcher.name}
              </h2>
            </div>

            <button
              className="journal-button"
              onClick={() => setJournalOpen(true)}
            >
              CADERNO ({clues.length}/{allClues.length})
            </button>
          </header>

          <section className="city-stage">
            <div
              className="city-scene"
              style={{
                backgroundImage: `url("${process.env.PUBLIC_URL}/cenarios/cidade.png")`,
              }}
            >
              <div className="scene-label">
                <span>LOCAL: CENTRO DA CIDADE</span>
                <strong>
                  Explore as ruas e investigue os locais marcados
                </strong>
              </div>

              {cityLocations.map((location) => {
                const done = isLocationComplete(location);

                const icons = {
                  library: "▤",
                  museum: "⚙",
                  laboratory: "⚗",
                  central: "⌘",
                  clue: "⌕",
                };

                return (
                  <button
                    key={location.id}
                    className={`location-marker ${
                      location.type
                    }-marker ${done ? "found" : ""}`}
                    style={{
                      left: `${location.x}%`,
                      top: `${location.y}%`,
                    }}
                    onClick={() => openLocation(location)}
                    disabled={done}
                    title={
                      done
                        ? "Desafio concluído"
                        : `Investigar ${
                            location.name || location.title
                          }`
                    }
                  >
                    <span>
                      {done
                        ? "✓"
                        : icons[location.type] || "⌕"}
                    </span>

                    <small>
                      {done
                        ? "CONCLUÍDO"
                        : location.name || "PISTA"}
                    </small>
                  </button>
                );
              })}

              <div
                className="player-marker"
                style={{
                  left: `${player.x}%`,
                  top: `${player.y}%`,
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/personagens/ada.png`}
                  alt="Ada caminhando"
                />
                <small>ADA</small>
              </div>
            </div>
          </section>

          <div className="city-controls">
            <span>
              WASD ou SETAS: movimentar · E: investigar
              um local próximo
            </span>

            <button
              className="close-button"
              onClick={() => setJournalOpen(true)}
            >
              ABRIR CADERNO
            </button>
          </div>

          <Credits />
        </main>
      )}

      {screen === "library" && (
        <Library
          researcher={currentResearcher}
          clues={clues}
          onClue={addClue}
          onExit={() => setScreen("city")}
          onOpenJournal={() => setJournalOpen(true)}
        />
      )}

      {screen === "museum" && (
        <Museum onExit={() => setScreen("city")} />
      )}

      {screen === "laboratory" && (
        <Laboratory
          onExit={() => setScreen("city")}
          onComplete={addClue}
        />
      )}

      {screen === "central" && (
        <Central
          onExit={() => setScreen("city")}
          onComplete={addClue}
        />
      )}

      {screen === "deduction" && (
        <main className="deduction-screen">
          <div className="deduction-card">
            <span className="eyebrow">
              ETAPA FINAL • ANÁLISE DE EVIDÊNCIAS
            </span>

            <h1>Quem é a pesquisadora?</h1>
            <p>{currentResearcher.question}</p>

            <div className="answer-options">
              {currentResearcher.options.map(
                (option, index) => (
                  <label
                    key={`${index}-${option}`}
                    className={`answer-option ${
                      selectedAnswer === String(index)
                        ? "selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="researcher"
                      value={index}
                      checked={
                        selectedAnswer === String(index)
                      }
                      onChange={(event) => {
                        setSelectedAnswer(event.target.value);
                        setFeedback("");
                      }}
                    />

                    <span>{option}</span>
                  </label>
                )
              )}
            </div>

            {feedback && (
              <p className="feedback-message">
                {feedback}
              </p>
            )}

            <div className="modal-actions">
              <button
                className="start-button"
                onClick={handleAnswer}
              >
                CONFIRMAR HIPÓTESE
              </button>

              <button
                className="close-button"
                onClick={() => {
                  setScreen("city");
                  setJournalOpen(true);
                }}
              >
                REVER CADERNO
              </button>
            </div>
          </div>
        </main>
      )}

      {screen === "result" && (
        <main className="result-screen">
          <div className="result-card">
            <span className="eyebrow">
              CASO RESOLVIDO · {caseNumber} DE{" "}
              {researchers.length}
            </span>

            <h1>Investigação concluída!</h1>

            <div className="result-profile">
              <span className="result-symbol">✦</span>

              <h2>{currentResearcher.name}</h2>

              <p className="result-area">
                {currentResearcher.area}
              </p>

              <p>{currentResearcher.institution}</p>
              <p>{currentResearcher.description}</p>
            </div>

            <div className="result-explanation">
              <strong>Por que essa era a resposta?</strong>
              <p>{currentResearcher.explanation}</p>
            </div>

            <button
              className="start-button"
              onClick={startNextCase}
            >
              {researcherDeck.length
                ? "INVESTIGAR PRÓXIMO CASO"
                : "FINALIZAR OPERAÇÃO"}
            </button>

            <button
              className="close-button"
              onClick={() => setScreen("home")}
            >
              VOLTAR AO INÍCIO
            </button>
          </div>
        </main>
      )}

      {selectedClue && (
        <div className="modal-overlay">
          <div className="dialogue-modal">
            <img
              className="dialogue-ada"
              src={`${process.env.PUBLIC_URL}/personagens/ada.png`}
              alt="Ada Lovelace"
            />

            <div className="dialogue-content">
              <span className="eyebrow">
                ADA • NOVA DESCOBERTA
              </span>

              <h2>{selectedClue.title}</h2>
              <p>{selectedClue.text}</p>

              <div className="modal-actions">
                <button
                  className="start-button"
                  onClick={() => {
                    addClue(selectedClue);
                    setSelectedClue(null);
                  }}
                >
                  GUARDAR NO CADERNO
                </button>

                <button
                  className="close-button"
                  onClick={() => setSelectedClue(null)}
                >
                  FECHAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {journalOpen && (
        <div className="modal-overlay">
          <div className="journal-modal">
            <button
              className="modal-close"
              onClick={() => setJournalOpen(false)}
              aria-label="Fechar caderno"
            >
              ×
            </button>

            <span className="eyebrow">
              OPERAÇÃO LOVELACE
            </span>

            <h2>Caderno de investigação</h2>

            <p className="journal-progress">
              Evidências encontradas:{" "}
              <strong>
                {clues.length}/{allClues.length}
              </strong>
            </p>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    allClues.length
                      ? (clues.length / allClues.length) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>

            {clues.length === 0 && (
              <p className="empty-journal">
                Ainda não há evidências. Explore a cidade
                e seus locais.
              </p>
            )}

            <div className="journal-list">
              {clues.map((clue) => (
                <article
                  className="journal-clue"
                  key={clue.id}
                >
                  <span>EVIDÊNCIA REGISTRADA</span>
                  <h3>{clue.title}</h3>
                  <p>{clue.text}</p>
                </article>
              ))}
            </div>

            {allEvidenceFound ? (
              <button
                className="start-button"
                onClick={() => {
                  setJournalOpen(false);
                  setSelectedAnswer("");
                  setFeedback("");
                  setScreen("deduction");
                }}
              >
                ANALISAR E RESOLVER O CASO
              </button>
            ) : (
              <p className="journal-reminder">
                Encontre mais{" "}
                {
                  allClues.filter(
                    (clue) => !foundIds.has(clue.id)
                  ).length
                }{" "}
                evidência(s) para liberar a análise final.
              </p>
            )}
          </div>
        </div>
      )}

      {introOpen && screen === "city" && (
        <div className="modal-overlay intro-overlay">
          <section className="intro-card">
            <img
              src={`${process.env.PUBLIC_URL}/personagens/ada.png`}
              alt="Ada Lovelace"
            />

            <div>
              <span className="eyebrow">
                MISSÃO INICIADA · CASO{" "}
                {String(caseNumber).padStart(3, "0")}
              </span>

              <h2>Temos um mistério para resolver!</h2>

              <p>
                Detetive, há pistas escondidas pela cidade.
                Investigue os locais marcados, reúna as
                evidências no caderno e descubra qual
                pesquisadora está ligada a este caso.
              </p>

              <div className="intro-objective">
                <strong>SEU PRIMEIRO OBJETIVO</strong>

                <span>
                  Explore as ruas e investigue os locais
                  identificados por placas.
                </span>
              </div>

              <p className="intro-controls">
                Use <strong>WASD</strong> ou as{" "}
                <strong>setas</strong> para movimentar Ada.
                Pressione <strong>E</strong> perto de um
                local para investigar.
              </p>

              <button
                className="start-button"
                onClick={() => setIntroOpen(false)}
              >
                COMEÇAR A INVESTIGAÇÃO
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}