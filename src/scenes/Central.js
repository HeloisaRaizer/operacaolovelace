
import React, { useState } from "react";

const challenges = [
  {
    title: "CÓDIGO 01 — PRIMEIRA PISTA",
    message: "A mensagem foi embaralhada. Qual palavra está escondida?",
    code: "B C D",
    hint: "Cada letra representa a letra anterior no alfabeto.",
    options: ["ABC", "BCD", "DEF"],
    answer: 0,
    explanation:
      "B representa A, C representa B e D representa C. A mensagem correta é ABC.",
  },
  {
    title: "CÓDIGO 02 — ACESSO RESTRITO",
    message: "Decifre a palavra usando a mesma lógica.",
    code: "D B T B",
    hint: "Volte uma letra no alfabeto para cada símbolo.",
    options: ["CASA", "DATA", "BOLA"],
    answer: 0,
    explanation:
      "DBTB, voltando uma letra em cada posição, forma CASA.",
  },
  {
    title: "CÓDIGO 03 — MENSAGEM FINAL",
    message: "O último código revela o local da próxima descoberta.",
    code: "N V T F V",
    hint: "Volte uma posição no alfabeto.",
    options: ["MUSEU", "LIVRO", "DADOS"],
    answer: 0,
    explanation:
      "NVTFV, voltando uma letra, revela MUSEU. A mensagem foi decifrada!",
  },
];

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function randomizeChallenges() {
  return challenges.map((challenge) => {
    const randomizedOptions = shuffle(
      challenge.options.map((option, index) => ({
        text: option,
        correct: index === challenge.answer,
      }))
    );

    return {
      ...challenge,
      options: randomizedOptions,
      answer: randomizedOptions.findIndex(
        (option) => option.correct
      ),
    };
  });
}

export default function Central({ onExit, onComplete }) {
  const [challengeList] = useState(() => randomizeChallenges());

  const [stage, setStage] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stageCorrect, setStageCorrect] = useState(false);

  const challenge = challengeList[stage];

  function verifyAnswer() {
    if (selected === "") {
      setFeedback("Selecione uma alternativa antes de continuar.");
      return;
    }

    if (Number(selected) === challenge.answer) {
      setStageCorrect(true);
      setFeedback(`CORRETO! ${challenge.explanation}`);

      if (stage === challengeList.length - 1) {
        setCompleted(true);

        if (onComplete) {
          onComplete({
            id: "central-evidencia",
            title: "Mensagem secreta decifrada",
            text:
              "A central confirmou que a mensagem aponta para o museu. A sequência de três códigos foi decifrada com sucesso.",
          });
        }
      }
    } else {
      setStageCorrect(false);
      setFeedback(
        "Código incorreto. Observe a dica e tente novamente."
      );
    }
  }

  function nextStage() {
    if (!stageCorrect) return;

    if (stage === challengeList.length - 1) {
      setCompleted(true);
      return;
    }

    setStage((previous) => previous + 1);
    setSelected("");
    setFeedback("");
    setShowHint(false);
    setStageCorrect(false);
  }

  return (
    <main className="central-screen">
      <header className="game-header">
        <div>
          <span className="eyebrow">OPERAÇÃO LOVELACE</span>
          <h2>Central de Decodificação</h2>
        </div>

        <button className="close-button" onClick={onExit}>
          VOLTAR
        </button>
      </header>

      <section className="central-stage">
        <div
          className="central-scene"
          style={{
            backgroundImage: `url("${process.env.PUBLIC_URL}/cenarios/central.png")`,
          }}
        >
          <div className="central-console">
            <span className="eyebrow">
              TERMINAL CRIPTOGRÁFICO
            </span>

            {completed ? (
              <>
                <h2>INVESTIGAÇÃO DA CENTRAL CONCLUÍDA!</h2>

                <p>
                  Os três códigos foram decifrados. A mensagem
                  aponta para o Museu da Ciência.
                </p>

                <div className="central-success">
                  ✓ EVIDÊNCIA REGISTRADA NO CADERNO
                </div>

                <p>
                  Você concluiu todas as etapas deste desafio.
                  Não é necessário realizá-lo novamente.
                </p>

                <button
                  className="start-button"
                  onClick={onExit}
                >
                  VOLTAR À INVESTIGAÇÃO
                </button>
              </>
            ) : (
              <>
                <h2>{challenge.title}</h2>

                <div className="central-progress">
                  ETAPA {stage + 1} DE {challengeList.length}
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        ((stage + 1) / challengeList.length) * 100
                      }%`,
                    }}
                  />
                </div>

                <p>{challenge.message}</p>

                <div className="central-code">
                  {challenge.code}
                </div>

                <button
                  className="close-button"
                  onClick={() =>
                    setShowHint((previous) => !previous)
                  }
                >
                  {showHint
                    ? "ESCONDER DICA"
                    : "PRECISO DE UMA DICA"}
                </button>

                {showHint && (
                  <div className="central-hint">
                    {challenge.hint}
                  </div>
                )}

                <div className="central-options">
                  {challenge.options.map((option, index) => (
                    <button
                      key={option.text}
                      disabled={stageCorrect}
                      className={`central-option ${
                        selected === String(index)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => {
                        setSelected(String(index));
                        setFeedback("");
                      }}
                    >
                      <span>
                        {String.fromCharCode(65 + index)}
                      </span>

                      {option.text}
                    </button>
                  ))}
                </div>

                {feedback && (
                  <div className="central-feedback">
                    {feedback}
                  </div>
                )}

                {!stageCorrect ? (
                  <button
                    className="start-button"
                    onClick={verifyAnswer}
                  >
                    DECIFRAR CÓDIGO
                  </button>
                ) : (
                  <button
                    className="start-button"
                    onClick={nextStage}
                  >
                    {stage === challengeList.length - 1
                      ? "FINALIZAR DESAFIO"
                      : "PRÓXIMA ETAPA"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
