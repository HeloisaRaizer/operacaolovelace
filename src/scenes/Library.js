import React, { useState } from "react";

export default function Library({
  researcher,
  clues = [],
  onClue,
  onExit,
  onOpenJournal,
}) {
  const [selectedClue, setSelectedClue] = useState(null);
  const [collecting, setCollecting] = useState(false);

  const libraryClues = researcher?.libraryClues || [];

  const foundIds = new Set(
    clues.map((clue) => String(clue.id))
  );

  const collectedHere = libraryClues.filter((clue) =>
    foundIds.has(String(clue.id))
  ).length;

  const totalClues = libraryClues.length;

  const allCollected =
    totalClues > 0 && collectedHere === totalClues;

  const handleCollect = () => {
    if (!selectedClue || collecting) return;

    const clueId = String(selectedClue.id);

    // Não permite duplicar evidências
    if (foundIds.has(clueId)) {
      setSelectedClue(null);
      return;
    }

    setCollecting(true);

    // Envia a pista para o estado principal do jogo
    onClue(selectedClue);

    // Fecha a janela de descoberta
    setSelectedClue(null);
    setCollecting(false);
  };

  return (
    <main className="library-screen">
      {/* CABEÇALHO */}
      <header className="game-header">
        <div>
          <span className="eyebrow">OPERAÇÃO LOVELACE</span>

          <h2>Biblioteca Municipal</h2>

          <p className="library-objective">
            {allCollected
              ? "ETAPA CONCLUÍDA — Todas as evidências foram encontradas!"
              : "OBJETIVO: Encontre todos os documentos necessários para o caso."}
          </p>
        </div>

        <div className="header-actions">
          <button
            className="journal-button"
            onClick={onOpenJournal}
          >
            CADERNO ({clues.length})
          </button>

          <button
            className="close-button"
            onClick={onExit}
          >
            VOLTAR À CIDADE
          </button>
        </div>
      </header>

      {/* CENÁRIO */}
      <section className="library-stage">
        <div
          className="library-scene"
          style={{
            backgroundImage: `url("${process.env.PUBLIC_URL}/cenarios/biblioteca.png")`,
          }}
        >
          {/* IDENTIFICAÇÃO DO LOCAL */}
          <div className="scene-label">
            <span>LOCAL: BIBLIOTECA</span>

            <strong>
              {allCollected
                ? "INVESTIGAÇÃO DESTE LOCAL CONCLUÍDA"
                : "Investigue os objetos destacados"}
            </strong>
          </div>

          {/* OBJETOS / PISTAS */}
          {libraryClues.map((clue, index) => {
            const found = foundIds.has(String(clue.id));

            const defaultX = 18 + index * 16;
            const defaultY = 48 + (index % 2) * 12;

            return (
              <button
                key={clue.id}
                className={`library-clue ${
                  found ? "found" : ""
                }`}
                style={{
                  left: `${clue.x ?? defaultX}%`,
                  top: `${clue.y ?? defaultY}%`,
                }}
                onClick={() => {
                  if (!found) {
                    setSelectedClue(clue);
                  }
                }}
                disabled={found}
                title={
                  found
                    ? "Pista já coletada"
                    : "Clique para investigar"
                }
              >
                <span>
                  {found ? "✓" : "⌕"}
                </span>

                <small>
                  {found ? "COLETADO" : "INVESTIGAR"}
                </small>
              </button>
            );
          })}

          {/* CONCLUSÃO */}
          {allCollected && (
            <div className="library-complete-banner">
              <span>✓</span>

              <strong>BIBLIOTECA CONCLUÍDA!</strong>

              <p>
                Todos os documentos deste local foram recuperados.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* RODAPÉ / PROGRESSO */}
      <div className="library-footer">
        <div className="library-progress-info">
          <p>PROGRESSO DA BIBLIOTECA</p>

          <strong>
            {collectedHere} / {totalClues} DOCUMENTOS
          </strong>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${
                  totalClues > 0
                    ? (collectedHere / totalClues) * 100
                    : 0
                }%`,
              }}
            />
          </div>

          <p>
            {allCollected
              ? "Etapa concluída! Retorne à cidade para continuar a investigação."
              : `Faltam ${
                  totalClues - collectedHere
                } documento(s) para concluir esta etapa.`}
          </p>
        </div>

        <button
          className="journal-button"
          onClick={onOpenJournal}
        >
          ABRIR CADERNO
        </button>

        {allCollected && (
          <button
            className="start-button"
            onClick={onExit}
          >
            CONCLUIR BIBLIOTECA ✓
          </button>
        )}
      </div>

      {/* MODAL DA DESCOBERTA */}
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
                  onClick={handleCollect}
                  disabled={collecting}
                >
                  {collecting
                    ? "SALVANDO..."
                    : "GUARDAR NO CADERNO"}
                </button>

                <button
                  className="close-button"
                  onClick={() => setSelectedClue(null)}
                  disabled={collecting}
                >
                  FECHAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}