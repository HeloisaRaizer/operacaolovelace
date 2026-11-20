import React, { useState, useEffect } from "react";
import Library from "./scenes/Library";
import Museum from "./scenes/Museum";
import Laboratory from "./scenes/Laboratory";
import Central from "./scenes/Central";
import researchers from "./researchers";
import "./App.css";

const LOCATIONS = [
  { id: "library", label: "BIBLIOTECA", x: 35, y: 40, icon: "⌂" },
  { id: "museum", label: "MUSEU DA CIÊNCIA", x: 65, y: 40, icon: "⚙" },
  { id: "laboratory", label: "LABORATÓRIO", x: 35, y: 78, icon: "⚗" },
  { id: "central", label: "CENTRAL DE PESQUISA", x: 65, y: 78, icon: "⌘" },
];

const PLACE_NAMES = {
  library: "Biblioteca",
  museum: "Museu da Ciência",
  laboratory: "Laboratório",
  central: "Central de Pesquisa",
};

export default function App() {
  const [screen, setScreen] = useState("home");

  // CONTROLADOR DOS DOSSIÊS
  const [researcherIndex, setResearcherIndex] = useState(0);

  const researcher = researchers[researcherIndex];
  const caseNumber = String(researcherIndex + 1).padStart(3, "0");

  const hasNextCase = researcherIndex < researchers.length - 1;

  const [clues, setClues] = useState([]);
  const [completedPlaces, setCompletedPlaces] = useState([]);

  const [journalOpen, setJournalOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);
  const [finalOpen, setFinalOpen] = useState(false);

  const challenges = researcher.challenges;
  const totalChallenges = challenges.length;

  const completedChallenges = clues.length;
  const caseFinished = completedChallenges === totalChallenges;

  // ABRE A MENSAGEM FINAL QUANDO O CASO É CONCLUÍDO
  useEffect(() => {
    if (caseFinished && completedPlaces.includes("central")) {
      setFinalOpen(true);
    }
  }, [caseFinished, completedPlaces]);

  // INICIA UMA NOVA INVESTIGAÇÃO PELO PRIMEIRO DOSSIÊ
  function beginCase() {
    setResearcherIndex(0);

    setClues([]);
    setCompletedPlaces([]);

    setJournalOpen(false);
    setFinalOpen(false);
    setIntroOpen(true);

    setScreen("city");
  }

  // INICIA O PRÓXIMO DOSSIÊ
  function startNextCase() {
    if (!hasNextCase) {
      finishInvestigation();
      return;
    }

    setResearcherIndex((previous) => previous + 1);

    // ZERA O PROGRESSO DO CASO ANTERIOR
    setClues([]);
    setCompletedPlaces([]);

    setJournalOpen(false);
    setFinalOpen(false);

    // ABRE A INTRODUÇÃO DA NOVA PESQUISADORA
    setIntroOpen(true);
    setScreen("city");
  }

  // ENCERRA A INVESTIGAÇÃO COMPLETA
  function finishInvestigation() {
    setFinalOpen(false);
    setIntroOpen(false);
    setJournalOpen(false);

    setResearcherIndex(0);
    setClues([]);
    setCompletedPlaces([]);

    setScreen("home");
  }

  // REGISTRA AS PISTAS SEM DUPLICÁ-LAS
  function saveClue(clue) {
    if (!clue || clue.id === undefined || clue.id === null) return;

    setClues((previous) =>
      previous.some((item) => item.id === clue.id)
        ? previous
        : [...previous, clue]
    );
  }

  // MARCA O LOCAL COMO CONCLUÍDO
  function completePlace(place) {
    setCompletedPlaces((previous) =>
      previous.includes(place) ? previous : [...previous, place]
    );

    setScreen("city");
  }

  function leaveScene() {
    setScreen("city");
  }

  // ENVIA OS DADOS PARA OS CENÁRIOS
  function renderScene() {
    const props = {
      researcher,
      clues,
      onClue: saveClue,
      onExit: leaveScene,
      onComplete: completePlace,
    };

    if (screen === "library") return <Library {...props} />;
    if (screen === "museum") return <Museum {...props} />;
    if (screen === "laboratory") return <Laboratory {...props} />;
    if (screen === "central") return <Central {...props} />;

    return null;
  }

  // ==========================================
  // TELA INICIAL
  // ==========================================

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

          <button className="start-button" onClick={beginCase}>
            INICIAR NOVA INVESTIGAÇÃO
          </button>

          <small>EXPLORE · INVESTIGUE · DESCUBRA</small>
        </div>
      </main>
    );
  }

  // ==========================================
  // TELAS DOS LOCAIS
  // ==========================================

  if (screen !== "city") {
    return renderScene();
  }

  // ==========================================
  // MAPA DA CIDADE
  // ==========================================

  return (
    <div className="app">
      <main className="game-screen">
        <header className="game-header">
          <div className="case-heading">
            <span className="eyebrow">
              ARQUIVO DE INVESTIGAÇÃO · OPERAÇÃO LOVELACE
            </span>

            <h2>
              DOSSIÊ {caseNumber} — {researcher.name.toUpperCase()}
            </h2>
          </div>

          <button
            className="journal-button"
            onClick={() => setJournalOpen(true)}
          >
            CADERNO ({completedChallenges}/{totalChallenges})
          </button>
        </header>

        <section className="city-stage">
          <div
            className="city-scene"
            style={{
              backgroundImage: `url("${process.env.PUBLIC_URL}/cenarios/cidade.png")`,
            }}
          >
            {/* PROGRESSO DOS DESAFIOS */}
            <div
              className="campaign-progress-panel"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                width: 270,
                maxWidth: "32%",
                zIndex: 20,
              }}
            >
              <div
                className="campaign-progress-track"
                aria-label={`Desafios ${completedChallenges} de ${totalChallenges}`}
              >
                {challenges.map((challenge) => (
                  <span
                    key={challenge.id}
                    className={`campaign-progress-segment ${
                      clues.some((c) => c.id === challenge.id)
                        ? "complete"
                        : ""
                    }`}
                    title={`Desafio ${challenge.id}`}
                  />
                ))}
              </div>
            </div>

            {/* OBJETIVO */}
            <div
              className="scene-label"
              style={{
                position: "absolute",
                top: "auto",
                left: 14,
                bottom: 14,
                width: 270,
                maxWidth: "32%",
                zIndex: 20,
              }}
            >
              <span>OBJETIVO DA INVESTIGAÇÃO</span>

              <strong>
                Explore os locais, resolva os oito desafios e descubra quem é
                a pesquisadora.
              </strong>
            </div>

            {/* LOCAIS */}
            {LOCATIONS.map((loc) => {
              const done = completedPlaces.includes(loc.id);

              return (
                <button
                  key={loc.id}
                  className={`location-marker ${loc.id}-marker ${
                    done ? "found" : ""
                  }`}
                  style={{
                    left: `${loc.x}%`,
                    top: `${loc.y}%`,
                  }}
                  disabled={done}
                  onClick={() => !done && setScreen(loc.id)}
                  title={done ? "Local concluído" : `Investigar ${loc.label}`}
                >
                  <span>{done ? "✓" : loc.icon}</span>
                  <small>{done ? "CONCLUÍDO" : loc.label}</small>
                </button>
              );
            })}

            {/* CASO SOLUCIONADO */}
            {caseFinished && (
              <div
                className="library-complete-banner"
                style={{
                  position: "absolute",
                  bottom: "25%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 22,
                  textAlign: "center",
                }}
              >
                <strong>CASO SOLUCIONADO!</strong>

                <p>Identidade confirmada: {researcher.name}.</p>

                <button
                  className="start-button"
                  onClick={() => setFinalOpen(true)}
                >
                  VER MENSAGEM DA ADA
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CONTROLES */}
        <div className="city-controls">
          <span>
            Explore os locais e conclua os desafios · Progresso{" "}
            {completedChallenges}/{totalChallenges}
          </span>

          <button
            className="close-button"
            onClick={() => setJournalOpen(true)}
          >
            ABRIR CADERNO
          </button>
        </div>
      </main>

      {/* ======================================
          INTRODUÇÃO DO DOSSIÊ
      ====================================== */}

      {introOpen && (
        <div className="modal-overlay intro-overlay">
          <section className="intro-card">
            <img
              src={`${process.env.PUBLIC_URL}/personagens/ada.png`}
              alt="Ada Lovelace"
            />

            <div>
              <span className="eyebrow">
                MISSÃO INICIADA · DOSSIÊ {caseNumber}
              </span>

              <h2>Olá, detetive!</h2>

              <p style={{ whiteSpace: "pre-line" }}>
                {researcher.intro}
              </p>

              <button
                className="start-button"
                onClick={() => setIntroOpen(false)}
              >
                ACEITO A MISSÃO
              </button>
            </div>
          </section>
        </div>
      )}

      {/* ======================================
          CADERNO DE INVESTIGAÇÃO
      ====================================== */}

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
                DOSSIÊ {caseNumber} · {researcher.name.toUpperCase()}
              </p>
            </header>

            <section className="journal-overview">
              <div className="journal-count">
                <strong>{completedChallenges}</strong>
                <span>de {totalChallenges} pistas encontradas</span>
              </div>

              <div className="journal-progress-track">
                <div
                  className="journal-progress-fill"
                  style={{
                    width: `${
                      (completedChallenges / totalChallenges) * 100
                    }%`,
                  }}
                />
              </div>
            </section>

            {/* PROGRESSO DOS LOCAIS */}
            <section className="journal-stages-new">
              <h3>Progresso dos locais</h3>

              <div className="journal-stage-grid">
                {LOCATIONS.map((loc) => (
                  <div
                    key={loc.id}
                    className={`journal-stage-card ${
                      completedPlaces.includes(loc.id)
                        ? "stage-done"
                        : "stage-pending"
                    }`}
                  >
                    <span className="stage-icon">
                      {completedPlaces.includes(loc.id) ? "✓" : "○"}
                    </span>

                    <span>{PLACE_NAMES[loc.id]}</span>

                    <small>
                      {completedPlaces.includes(loc.id)
                        ? "CONCLUÍDO"
                        : "PENDENTE"}
                    </small>
                  </div>
                ))}
              </div>
            </section>

            {/* PISTAS */}
            <section className="journal-section-new">
              <div className="journal-section-heading">
                <div>
                  <span className="journal-section-kicker">
                    PISTAS RECUPERADAS
                  </span>

                  <h3>As oito evidências</h3>
                </div>

                <span className="journal-section-count">
                  {completedChallenges}/{totalChallenges}
                </span>
              </div>

              <div className="journal-evidence-grid">
                {challenges.map((challenge) => {
                  const got = clues.some((c) => c.id === challenge.id);

                  return (
                    <article
                      key={challenge.id}
                      className={`journal-evidence-card ${
                        got ? "evidence-found" : "evidence-missing"
                      }`}
                    >
                      <span className="evidence-status">
                        {got ? "✓ PISTA RECUPERADA" : "○ PENDENTE"}
                      </span>

                      <h4>{challenge.title}</h4>

                      <p>
                        {got
                          ? challenge.clue
                          : "Resolva o desafio correspondente para revelar esta pista."}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* FINAL DO CADERNO */}
            <footer className="journal-footer-new">
              {caseFinished ? (
                <div className="journal-ready-message">
                  <span>✓</span>

                  <strong>Todos os desafios foram concluídos!</strong>

                  <p>A identidade da pesquisadora está confirmada.</p>
                </div>
              ) : (
                <p className="journal-reminder">
                  Continue investigando e recupere as oito pistas.
                </p>
              )}

              <button
                className="start-button journal-final-button"
                onClick={() => setJournalOpen(false)}
              >
                VOLTAR AO MAPA
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* ======================================
          MENSAGEM FINAL DA ADA
      ====================================== */}

      {finalOpen && caseFinished && (
        <div className="modal-overlay">
          <div className="dialogue-modal">
            <img
              className="dialogue-ada"
              src={`${process.env.PUBLIC_URL}/personagens/ada.png`}
              alt="Ada Lovelace"
            />

            <div className="dialogue-content">
              <span className="eyebrow">
                ADA · DOSSIÊ {caseNumber} SOLUCIONADO
              </span>

              <h2>{researcher.name}</h2>

              <p style={{ whiteSpace: "pre-line" }}>
                {researcher.finalMessage}
              </p>

              <div className="modal-actions">
                {hasNextCase ? (
                  <button
                    className="start-button"
                    onClick={startNextCase}
                  >
                    INICIAR DOSSIÊ{" "}
                    {String(researcherIndex + 2).padStart(3, "0")} →
                  </button>
                ) : (
                  <button
                    className="start-button"
                    onClick={finishInvestigation}
                  >
                    ENCERRAR INVESTIGAÇÃO
                  </button>
                )}

                <button
                  className="close-button"
                  onClick={() => setFinalOpen(false)}
                >
                  FECHAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}