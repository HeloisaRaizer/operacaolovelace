import React, { useCallback, useEffect, useMemo, useState } from "react";
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

const randomizeResearcher = (researcher) => {
  const cityPositions = shuffle([
    { x: 18, y: 50 },
    { x: 82, y: 50 },
    { x: 32, y: 85 },
    { x: 68, y: 85 },
    { x: 50, y: 48 },
  ]);

  const libraryPositions = shuffle([
    { x: 18, y: 42 },
    { x: 35, y: 65 },
    { x: 52, y: 38 },
    { x: 70, y: 62 },
    { x: 84, y: 42 },
  ]);

  return {
    ...researcher,
    cityClues: (researcher.cityClues || []).map((clue, i) => ({
      ...clue,
      ...cityPositions[i % cityPositions.length],
    })),
    libraryClues: (researcher.libraryClues || []).map((clue, i) => ({
      ...clue,
      ...libraryPositions[i % libraryPositions.length],
    })),
  };
};

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export default function App() {
  const [screen, setScreen] = useState("home");
  const [player, setPlayer] = useState({ x: 50, y: 85 });
  const [researcherDeck, setResearcherDeck] = useState([]);
  const [currentResearcher, setCurrentResearcher] = useState(null);
  const [caseNumber, setCaseNumber] = useState(1);
  const [clues, setClues] = useState([]);
  const [completedPlaces, setCompletedPlaces] = useState([]);
  const [journalOpen, setJournalOpen] = useState(false);
  const [selectedClue, setSelectedClue] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [introOpen, setIntroOpen] = useState(false);

  const allClues = useMemo(
    () =>
      currentResearcher
        ? [
            ...(currentResearcher.cityClues || []),
            ...(currentResearcher.libraryClues || []),
            {
              id: "laboratorio-evidencia",
              title: "Relatório de análise do laboratório",
              text: "O laboratório confirmou que as informações precisam ser comparadas, analisadas e validadas antes de uma conclusão.",
            },
            {
              id: "central-evidencia",
              title: "Mensagem secreta decifrada",
              text: "A central confirmou que a mensagem aponta para o Museu da Ciência. A sequência de códigos foi decifrada com sucesso.",
            },
            {
              id: `${currentResearcher.id}-museum-evidence`,
              title: `Registro científico: ${currentResearcher.name}`,
              text: `A missão do Museu confirmou informações relacionadas a ${currentResearcher.area}. ${currentResearcher.explanation}`,
              scene: "museum",
            },
          ]
        : [],
    [currentResearcher]
  );

  const foundIds = useMemo(() => clues.map((c) => c.id), [clues]);

  const museumDone = completedPlaces.includes("museum");

  const requiredPlaces = ["library", "museum", "laboratory", "central"];

  const requiredPlacesDone = requiredPlaces.every((place) =>
    completedPlaces.includes(place)
  );

  const caseReady =
    allClues.every((requiredClue) =>
      clues.some((foundClue) => foundClue.id === requiredClue.id)
    ) && requiredPlacesDone;

  const libraryDone =
    (currentResearcher?.libraryClues || []).length > 0 &&
    (currentResearcher?.libraryClues || []).every((c) =>
      foundIds.includes(c.id)
    );

  const cityLocations = useMemo(
    () =>
      currentResearcher
        ? [
            {
              id: "library",
              name: "BIBLIOTECA",
              x: 35,
              y: 40,
              type: "library",
            },
            {
              id: "museum",
              name: "MUSEU DA CIÊNCIA",
              x: 65,
              y: 40,
              type: "museum",
            },
            {
              id: "laboratory",
              name: "LABORATÓRIO",
              x: 35,
              y: 78,
              type: "laboratory",
            },
            {
              id: "central",
              name: "CENTRAL DE CÓDIGOS",
              x: 65,
              y: 78,
              type: "central",
            },
            ...(currentResearcher.cityClues || []).map((c) => ({
              ...c,
              type: "clue",
            })),
          ]
        : [],
    [currentResearcher]
  );

  const resetCase = () => {
    setClues([]);
    setCompletedPlaces([]);
    setPlayer({ x: 50, y: 85 });
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
    setClues([]);
    setCompletedPlaces([]);
    setPlayer({ x: 50, y: 85 });
    setJournalOpen(false);
    setSelectedClue(null);
    setSelectedAnswer("");
    setFeedback("");
    setIntroOpen(true);
    setScreen("city");
  };

  const startNextCase = () => {
    if (!researcherDeck.length) {
      setCurrentResearcher(null);
      setScreen("gameComplete");
      return;
    }

    setCurrentResearcher(randomizeResearcher(researcherDeck[0]));
    setResearcherDeck(researcherDeck.slice(1));
    setCaseNumber((n) => n + 1);
    resetCase();
  };

  const addClue = useCallback((clue) => {
    if (!clue || !clue.id) return;

    setClues((prev) =>
      prev.some((item) => item.id === clue.id) ? prev : [...prev, clue]
    );
  }, []);

  const markPlaceComplete = useCallback(
    (id) =>
      setCompletedPlaces((prev) =>
        prev.includes(id) ? prev : [...prev, id]
      ),
    []
  );

  const movePlayer = useCallback((key) => {
    const dirs = {
      arrowup: [0, -1],
      w: [0, -1],
      arrowdown: [0, 1],
      s: [0, 1],
      arrowleft: [-1, 0],
      a: [-1, 0],
      arrowright: [1, 0],
      d: [1, 0],
    };

    const dir = dirs[key.toLowerCase()];
    if (!dir) return;

    setPlayer((prev) => {
      const next = {
        x: clamp(prev.x + dir[0] * 2.5, 5, 95),
        y: clamp(prev.y + dir[1] * 2.5, 5, 95),
      };

      const onMainStreet = next.y >= 43 && next.y <= 57;
      const onCentralStreet = next.x >= 45 && next.x <= 57;
      const onLowerStreet = next.y >= 82 && next.y <= 92;

      if (onMainStreet || onCentralStreet || onLowerStreet) {
        return next;
      }

      return prev;
    });
  }, []);

  const openLocation = useCallback(
    (location) => {
      if (location.type === "library") {
        if (!libraryDone && !completedPlaces.includes("library")) {
          setScreen("library");
        }
        return;
      }

      if (location.type === "museum") {
        if (!museumDone) setScreen("museum");
        return;
      }

      if (location.type === "laboratory") {
        if (!completedPlaces.includes("laboratory")) {
          setScreen("laboratory");
        }
        return;
      }

      if (location.type === "central") {
        if (!completedPlaces.includes("central")) {
          setScreen("central");
        }
        return;
      }

      if (!foundIds.includes(location.id)) {
        setSelectedClue(location);
      }
    },
    [libraryDone, completedPlaces, foundIds, museumDone]
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

    const nearest = cityLocations
      .map((l) => ({
        ...l,
        distance: Math.hypot(player.x - l.x, player.y - l.y),
      }))
      .sort((a, b) => a.distance - b.distance)[0];

    if (nearest && nearest.distance <= 18) {
      openLocation(nearest);
    }
  }, [
    currentResearcher,
    introOpen,
    journalOpen,
    selectedClue,
    cityLocations,
    player,
    openLocation,
  ]);

  useEffect(() => {
    if (screen !== "city") return;

    const keyDown = (e) => {
      const key = e.key.toLowerCase();

      if (
        [
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
          "w",
          "a",
          "s",
          "d",
        ].includes(key)
      ) {
        e.preventDefault();

        if (!introOpen && !journalOpen && !selectedClue) {
          movePlayer(key);
        }
      }

      if (key === "e" || key === " ") {
        e.preventDefault();
        interact();
      }

      if (key === "escape") {
        setSelectedClue(null);
        setJournalOpen(false);
      }
    };

    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
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

    if (!caseReady) {
      setFeedback(
        "Ainda faltam etapas da investigação. Conclua todos os locais e reúna as evidências antes de confirmar"
      );
      return;
    }

    if (Number(selectedAnswer) === currentResearcher.answer) {
      setFeedback("Acertou! As evidências confirmam sua hipótese.");
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
          <h1>
            OPERAÇÃO
            <br />
            LOVELACE
          </h1>

          <p>A imaginação transforma ideias em descobertas.</p>

          <img
            className="home-ada"
            src={`${process.env.PUBLIC_URL}/personagens/ada.png`}
            alt="Ada Lovelace"
          />

          <button className="start-button" onClick={startFirstCase}>
            INICIAR NOVA INVESTIGAÇÃO
          </button>

          <small>EXPLORE · INVESTIGUE · DESCUBRA</small>
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
            Todos os casos foram solucionados. As histórias e contribuições
            dessas pesquisadoras agora fazem parte do arquivo da Operação
            Lovelace.
          </p>

          <p className="completion-message">
            Parabéns, detetive. Missão cumprida!
          </p>

          <button className="start-button" onClick={startFirstCase}>
            JOGAR NOVAMENTE
          </button>

          <button className="close-button" onClick={() => setScreen("home")}>
            VOLTAR AO INÍCIO
          </button>
        </section>
      </main>
    );
  }

  if (!currentResearcher) {
    return <div className="loading-screen">Preparando investigação...</div>;
  }

  return (
    <div className="app">
      {screen === "city" && (
        <main className="game-screen">
          <header className="game-header">
            <div className="case-heading">
  <span className="eyebrow">ARQUIVO DE INVESTIGAÇÃO · OPERAÇÃO LOVELACE</span>
  <h2>
    DOSSIÊ {String(caseNumber).padStart(3, "0")} —{" "}
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
              {/* CAMPANHA — POSICIONADA NO TOPO DIREITO */}
              <div
                className="campaign-progress-panel"
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  left: "auto",
                  width: "270px",
                  maxWidth: "32%",
                  zIndex: 20,
                }}
              >
                

                <div
                  className="campaign-progress-track"
                  aria-label={`Caso ${caseNumber} de ${researchers.length}`}
                >
                  {researchers.map((researcher, index) => (
                    <span
                      key={researcher.id || researcher.name || index}
                      className={`campaign-progress-segment ${
                        index < caseNumber - 1 ? "complete" : ""
                      } ${index === caseNumber - 1 ? "current" : ""}`}
                      title={`Caso ${index + 1}`}
                    />
                  ))}
                </div>

              
              </div>

              {/* OBJETIVO — POSICIONADO NO CANTO INFERIOR ESQUERDO */}
              <div
                className="scene-label"
                style={{
                  position: "absolute",
                  top: "auto",
                  left: "14px",
                  bottom: "14px",
                  right: "auto",
                  width: "270px",
                  maxWidth: "32%",
                  zIndex: 20,
                }}
              >
                <span>OBJETIVO DA INVESTIGAÇÃO</span>
                <strong>
                   Explore os locais da cidade, reúna pistas e analise
  e                 vidências para desvendar o caso da pesquisadora.
                </strong>
              </div>

              {cityLocations.map((location) => {
                const found = foundIds.includes(location.id);

                const done =
                  (location.type === "library" &&
                    (libraryDone || completedPlaces.includes("library"))) ||
                  (location.type === "museum" && museumDone) ||
                  (location.type === "laboratory" &&
                    completedPlaces.includes("laboratory")) ||
                  (location.type === "central" &&
                    completedPlaces.includes("central"));

                const disabled = found || done;

                return (
                  <button
                    key={location.id}
                    className={`location-marker ${location.type}-marker ${
                      disabled ? "found" : ""
                    }`}
                    style={{
                      left: `${location.x}%`,
                      top: `${location.y}%`,
                    }}
                    onClick={() => openLocation(location)}
                    disabled={disabled}
                    title={
                      disabled
                        ? "Desafio concluído"
                        : `Investigar ${location.name || location.title}`
                    }
                  >
                    <span>
                      {disabled
                        ? "✓"
                        : location.type === "library"
                        ? "⌂"
                        : location.type === "museum"
                        ? "⚙"
                        : location.type === "laboratory"
                        ? "⚗"
                        : location.type === "central"
                        ? "⌘"
                        : "?"}
                    </span>

                    <small>
                      {disabled
                        ? "CONCLUÍDO"
                        : location.name || location.title}
                    </small>
                  </button>
                );
              })}

              {/* ADA REMOVIDA DO MAPA */}
            </div>
          </section>

          <div className="city-controls">
            <span>
              WASD ou SETAS: movimentar · E: investigar o local próximo
            </span>

            <button
              className="close-button"
              onClick={() => setJournalOpen(true)}
            >
              ABRIR CADERNO
            </button>
          </div>
        </main>
      )}

      {screen === "library" && (
        <Library
          researcher={currentResearcher}
          clues={clues}
          onClue={addClue}
          onExit={() => {
            const done = (currentResearcher.libraryClues || []).every((c =>
              clues.some((item) => item.id === c.id)
            ));

            if (done) markPlaceComplete("library");
            setScreen("city");
          }}
          onOpenJournal={() => setJournalOpen(true)}
        />
      )}

      {screen === "museum" && (
        <Museum
          researcher={currentResearcher}
          onExit={() => setScreen("city")}
          onComplete={() => {
            const museumEvidence = allClues.find(
              (clue) => clue.scene === "museum"
            );
            if (museumEvidence) addClue(museumEvidence);
            markPlaceComplete("museum");
          }}
        />
      )}

      {screen === "laboratory" && (
        <Laboratory
          onExit={() => setScreen("city")}
          onComplete={(clue) => {
            addClue(clue);
            markPlaceComplete("laboratory");
          }}
        />
      )}

      {screen === "central" && (
        <Central
          onExit={() => setScreen("city")}
          onComplete={(clue) => {
            addClue(clue);
            markPlaceComplete("central");
          }}
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
              {currentResearcher.options.map((option, index) => (
                <label
                  key={option}
                  className={`answer-option ${
                    selectedAnswer === String(index) ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="researcher"
                    value={index}
                    checked={selectedAnswer === String(index)}
                    onChange={(e) => {
                      setSelectedAnswer(e.target.value);
                      setFeedback("");
                    }}
                  />

                  <span>{option}</span>
                </label>
              ))}
            </div>

            {feedback && <p className="feedback-message">{feedback}</p>}

            <div className="modal-actions">
              <button className="start-button" onClick={handleAnswer}>
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
              CASO RESOLVIDO · {caseNumber} DE {researchers.length}
            </span>

            <h1>Investigação concluída!</h1>

            <div className="result-profile">
              <span className="result-symbol">✦</span>
              <h2>{currentResearcher.name}</h2>
              <p className="result-area">{currentResearcher.area}</p>
              <p>{currentResearcher.institution}</p>
              <p>{currentResearcher.description}</p>
            </div>

            <div className="result-explanation">
              <strong>Por que essa era a resposta?</strong>
              <p>{currentResearcher.explanation}</p>
            </div>

            <button className="start-button" onClick={startNextCase}>
              {researcherDeck.length
                ? "INVESTIGAR PRÓXIMO CASO"
                : "FINALIZAR OPERAÇÃO"}
            </button>

            <button className="close-button" onClick={() => setScreen("home")}>
              VOLTAR AO INÍCIO
            </button>
          </div>
        </main>
      )}

      {/* MODAL DE PISTA */}
      {selectedClue && (
        <div className="modal-overlay">
          <div className="dialogue-modal">
            <img
              className="dialogue-ada"
              src={`${process.env.PUBLIC_URL}/personagens/ada.png`}
              alt="Ada Lovelace"
            />

            <div className="dialogue-content">
              <span className="eyebrow">ADA • NOVA DESCOBERTA</span>
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

      {/* CADERNO DE INVESTIGAÇÃO — NOVO LAYOUT */}
      {journalOpen && (
        <div className="modal-overlay journal-overlay">
          <div className="journal-modal journal-redesign">
            <button
              className="modal-close"
              onClick={() => setJournalOpen(false)}
              aria-label="Fechar caderno"
            >
              ×
            </button>

            <header className="journal-header-new">
              <span className="eyebrow">
                OPERAÇÃO LOVELACE · ARQUIVO CONFIDENCIAL
              </span>

              <h2>Caderno de investigação</h2>

              <p>
                CASO {String(caseNumber).padStart(3, "0")} ·{" "}
                {currentResearcher.name}
              </p>
            </header>

            {/* PROGRESSO GERAL */}
            <section className="journal-overview">
              <div className="journal-count">
                <strong>{clues.length}</strong>
                <span>de {allClues.length} evidências encontradas</span>
              </div>

              <div className="journal-progress-track">
                <div
                  className="journal-progress-fill"
                  style={{
                    width: `${
                      allClues.length
                        ? (clues.length / allClues.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </section>

            {/* STATUS DAS ETAPAS */}
            <section className="journal-stages-new">
              <h3>Progresso das etapas</h3>

              <div className="journal-stage-grid">
                {requiredPlaces.map((place) => {
                  const done = completedPlaces.includes(place);

                  const names = {
                    library: "Biblioteca",
                    museum: "Museu",
                    laboratory: "Laboratório",
                    central: "Central de códigos",
                  };

                  return (
                    <div
                      key={place}
                      className={`journal-stage-card ${
                        done ? "stage-done" : "stage-pending"
                      }`}
                    >
                      <span className="stage-icon">{done ? "✓" : "○"}</span>
                      <span>{names[place]}</span>
                      <small>{done ? "CONCLUÍDO" : "PENDENTE"}</small>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* PISTAS DA CIDADE */}
            <section className="journal-section-new">
              <div className="journal-section-heading">
                <div>
                  <span className="journal-section-kicker">01 · EXPLORAÇÃO</span>
                  <h3>Pistas da cidade</h3>
                </div>

                <span className="journal-section-count">
                  {(currentResearcher.cityClues || []).filter((c) =>
                    clues.some((f) => f.id === c.id)
                  ).length}
                  /{(currentResearcher.cityClues || []).length}
                </span>
              </div>

              <div className="journal-evidence-grid">
                {(currentResearcher.cityClues || []).map((clue) => {
                  const collected = clues.some((f) => f.id === clue.id);

                  return (
                    <article
                      key={clue.id}
                      className={`journal-evidence-card ${
                        collected ? "evidence-found" : "evidence-missing"
                      }`}
                    >
                      <span className="evidence-status">
                        {collected
                          ? "✓ EVIDÊNCIA RECUPERADA"
                          : "⌕ AINDA NÃO ENCONTRADA"}
                      </span>

                      <h4>{clue.title}</h4>

                      <p>
                        {collected
                          ? clue.text
                          : "Investigue o centro da cidade para recuperar este registro."}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* BIBLIOTECA */}
            <section className="journal-section-new">
              <div className="journal-section-heading">
                <div>
                  <span className="journal-section-kicker">02 · DOCUMENTOS</span>
                  <h3>Biblioteca</h3>
                </div>

                <span className="journal-section-count">
                  {(currentResearcher.libraryClues || []).filter((c) =>
                    clues.some((f) => f.id === c.id)
                  ).length}
                  /{(currentResearcher.libraryClues || []).length}
                </span>
              </div>

              <div className="journal-evidence-grid">
                {(currentResearcher.libraryClues || []).map((clue) => {
                  const collected = clues.some((f) => f.id === clue.id);

                  return (
                    <article
                      key={clue.id}
                      className={`journal-evidence-card ${
                        collected ? "evidence-found" : "evidence-missing"
                      }`}
                    >
                      <span className="evidence-status">
                        {collected
                          ? "✓ DOCUMENTO RECUPERADO"
                          : "⌕ DOCUMENTO PENDENTE"}
                      </span>

                      <h4>{clue.title}</h4>

                      <p>
                        {collected
                          ? clue.text
                          : "Este documento ainda não foi localizado. Explore a biblioteca."}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* OUTRAS EVIDÊNCIAS */}
            <section className="journal-section-new">
              <div className="journal-section-heading">
                <div>
                  <span className="journal-section-kicker">03 · ANÁLISE</span>
                  <h3>Outras evidências</h3>
                </div>
              </div>

              <div className="journal-evidence-grid">
                {allClues
                  .filter((clue) => {
                    const cityIds = (currentResearcher.cityClues || []).map(
                      (c) => c.id
                    );
                    const libraryIds = (
                      currentResearcher.libraryClues || []
                    ).map((c) => c.id);

                    return (
                      !cityIds.includes(clue.id) &&
                      !libraryIds.includes(clue.id)
                    );
                  })
                  .map((clue) => {
                    const collected = clues.some((f) => f.id === clue.id);

                    return (
                      <article
                        key={clue.id}
                        className={`journal-evidence-card ${
                          collected ? "evidence-found" : "evidence-missing"
                        }`}
                      >
                        <span className="evidence-status">
                          {collected ? "✓ REGISTRADA" : "○ AGUARDANDO"}
                        </span>

                        <h4>{clue.title}</h4>

                        <p>
                          {collected
                            ? clue.text
                            : "Conclua a etapa correspondente para desbloquear esta evidência."}
                        </p>
                      </article>
                    );
                  })}
              </div>
            </section>

            {/* RODAPÉ */}
            <footer className="journal-footer-new">
              {caseReady ? (
                <>
                  <div className="journal-ready-message">
                    <span>✓</span>
                    <strong>Todas as etapas foram concluídas!</strong>
                    <p>As evidências estão prontas para a análise final.</p>
                  </div>

                  <button
                    className="start-button journal-final-button"
                    onClick={() => {
                      setJournalOpen(false);
                      setSelectedAnswer("");
                      setFeedback("");
                      setScreen("deduction");
                    }}
                  >
                    ANALISAR E RESOLVER O CASO
                  </button>
                </>
              ) : (
                <p className="journal-reminder">
                  Continue investigando. Reúna todas as evidências e conclua
                  as quatro etapas para liberar a análise final.
                </p>
              )}
            </footer>
          </div>
        </div>
      )}

      {/* INTRODUÇÃO DO CASO */}
      {introOpen && screen === "city" && (
        <div className="modal-overlay intro-overlay">
          <section className="intro-card">
            <img
              src={`${process.env.PUBLIC_URL}/personagens/ada.png`}
              alt="Ada Lovelace"
            />

            <div>
              <span className="eyebrow">
                MISSÃO INICIADA · CASO {String(caseNumber).padStart(3, "0")}
              </span>

              <h2>Temos um mistério para resolver!</h2>

              <p>
                Detetive, há pistas escondidas pela cidade. Investigue os
                locais marcados, reúna as evidências no caderno e descubra
                qual pesquisadora está ligada a este caso.
              </p>

              <div className="intro-objective">
                <strong>SEU PRIMEIRO OBJETIVO</strong>
                <span>
                  Encontre um dos locais marcados com símbolos e investigue-o.
                </span>
              </div>

              <p className="intro-controls">
                Clique nos locais marcados no mapa para explorar e encontrar as
                evidências.
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