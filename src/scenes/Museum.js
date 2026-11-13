import React, { useState } from "react";

const exhibits = [
  {
    id: 1,
    title: "Ada Lovelace",
    text: "Ada Lovelace é reconhecida por seu trabalho com a Máquina Analítica e por escrever um algoritmo destinado a ser processado por uma máquina. Seu trabalho é frequentemente associado à história da programação.",
    x: 13,
    y: 57,
  },
  {
    id: 2,
    title: "História da Computação",
    text: "A computação evoluiu de máquinas mecânicas e dispositivos de cálculo para computadores eletrônicos, redes e sistemas inteligentes.",
    x: 52,
    y: 53,
  },
  {
    id: 3,
    title: "Evolução da Tecnologia",
    text: "A tecnologia transforma a maneira como as pessoas trabalham, estudam, se comunicam e resolvem problemas.",
    x: 88,
    y: 45,
  },
];

export default function Museum({ onExit }) {
  const [selected, setSelected] = useState(null);
  const [visited, setVisited] = useState([]);

  const openExhibit = (exhibit) => {
    setSelected(exhibit);

    setVisited((previous) =>
      previous.includes(exhibit.id)
        ? previous
        : [...previous, exhibit.id]
    );
  };

  return (
    <main className="museum-screen">
      <header className="game-header">
        <div>
          <span className="eyebrow">OPERAÇÃO LOVELACE</span>
          <h2>Museu da Ciência</h2>
        </div>

        <button className="close-button" onClick={onExit}>
          VOLTAR À CIDADE
        </button>
      </header>

      <section className="museum-stage">
        <div
          className="museum-scene"
          style={{
            backgroundImage: `url("${process.env.PUBLIC_URL}/cenarios/museu.png")`,
          }}
        >
          <div className="scene-label">
            <span>LOCAL: MUSEU DA CIÊNCIA</span>
            <strong>Explore as exposições</strong>
          </div>

          {exhibits.map((exhibit) => (
            <button
              key={exhibit.id}
              className={`museum-exhibit ${
                visited.includes(exhibit.id) ? "visited" : ""
              }`}
              style={{
                left: `${exhibit.x}%`,
                top: `${exhibit.y}%`,
              }}
              onClick={() => openExhibit(exhibit)}
              title={exhibit.title}
            >
              <span>
                {visited.includes(exhibit.id) ? "✓" : "⌕"}
              </span>
              <small>{exhibit.title}</small>
            </button>
          ))}
        </div>
      </section>

      <div className="museum-footer">
        <p>
          Exposições visitadas:{" "}
          <strong>
            {visited.length}/{exhibits.length}
          </strong>
          {visited.length === exhibits.length &&
            " — Você explorou todo o museu!"}
        </p>

        <button className="close-button" onClick={onExit}>
          SAIR DO MUSEU
        </button>
      </div>

      {selected && (
        <div className="modal-overlay">
          <div className="dialogue-modal">
            <img
              className="dialogue-ada"
              src={`${process.env.PUBLIC_URL}/personagens/ada.png`}
              alt="Ada Lovelace"
            />

            <div className="dialogue-content">
              <span className="eyebrow">ADA • MUSEU DA CIÊNCIA</span>
              <h2>{selected.title}</h2>
              <p>{selected.text}</p>

              <button
                className="start-button"
                onClick={() => setSelected(null)}
              >
                CONTINUAR EXPLORANDO
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}