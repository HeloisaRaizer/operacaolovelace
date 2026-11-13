import React, { useState } from "react";

export default function Library({
  researcher,
  clues = [],
  onClue,
  onExit,
  onOpenJournal,
}) {
  const [selectedClue, setSelectedClue] = useState(null);

  const libraryClues = researcher?.libraryClues || [];
  const foundIds = new Set(clues.map((clue) => clue.id));

  const collectedHere = libraryClues.filter((clue) =>
    foundIds.has(clue.id)
  ).length;

  const handleCollect = () => {
    if (!selectedClue || foundIds.has(selectedClue.id)) return;

    onClue(selectedClue);
    setSelectedClue(null);
  };

  return (
    <main className="library-screen">
      <header className="game-header">
        <div>
          <span className="eyebrow">OPERAÇÃO LOVELACE</span>
          <h2>Biblioteca Municipal</h2>
        </div>

        <div className="header-actions">
          <button className="journal-button" onClick={onOpenJournal}>
            CADERNO ({clues.length})
          </button>

          <button className="close-button" onClick={onExit}>
            VOLTAR À CIDADE
          </button>
        </div>
      </header>

      <section className="library-stage">
        <div
          className="library-scene"
          style={{
            backgroundImage: `url("${process.env.PUBLIC_URL}/cenarios/biblioteca.png")`,
          }}
        >
          <div className="scene-label">
            <span>LOCAL: BIBLIOTECA</span>
            <strong>Investigue os objetos destacados</strong>
          </div>

          {libraryClues.map((clue, index) => {
            const found = foundIds.has(clue.id);

            return (
              <button
                key={clue.id}
                className={`library-clue ${found ? "found" : ""}`}
                style={{
                  left: `${clue.x ?? 20 + index * 25}%`,
                  top: `${clue.y ?? 50}%`,
                }}
                onClick={() => setSelectedClue(clue)}
                disabled={found}
                title={found ? "Pista coletada" : "Investigar objeto"}
              >
                <span>{found ? "✓" : "⌕"}</span>
                <small>{found ? "COLETADO" : "INVESTIGAR"}</small>
              </button>
            );
          })}
        </div>
      </section>

      <div className="library-footer">
        <p>
          Evidências da biblioteca:{" "}
          <strong>
            {collectedHere}/{libraryClues.length}
          </strong>
          {collectedHere === libraryClues.length &&
            libraryClues.length > 0 &&
            " — Todos os documentos foram encontrados!"}
        </p>

        <button className="journal-button" onClick={onOpenJournal}>
          ABRIR CADERNO
        </button>
      </div>

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
                  onClick={handleCollect}
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
    </main>
  );
}