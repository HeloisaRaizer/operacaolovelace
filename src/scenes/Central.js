
import React, { useState } from "react";

const challenges = [
  {
    title: "CÓDIGO 01 — MENSAGEM INVERTIDA",
    message:
      "Uma mensagem foi encontrada em um documento antigo. Descubra o que ela revela.",
    code: "OÃÇAMROFNI",
    hint:
      "A mensagem foi escrita de trás para frente. Leia os caracteres na ordem inversa.",
    options: ["INFORMAÇÃO", "INVESTIGAÇÃO", "COMUNICAÇÃO"],
    answer: 0,
    explanation:
      "Ao inverter a sequência, encontramos INFORMAÇÃO. A primeira mensagem foi recuperada.",
  },
  {
    title: "CÓDIGO 02 — SEQUÊNCIA NUMÉRICA",
    message:
      "O terminal substituiu cada letra por sua posição no alfabeto. Qual palavra está escondida?",
    code: "3 - 9 - 5 - 14 - 20 - 9 - 19 - 20 - 1",
    hint:
      "A = 1, B = 2, C = 3... Cada número corresponde a uma letra.",
    options: ["CIENTISTA", "TECNOLOGIA", "PESQUISADORA"],
    answer: 0,
    explanation:
      "Substituindo cada número pela letra correspondente, encontramos CIENTISTA.",
  },
  {
    title: "CÓDIGO 03 — ESPELHO DO ALFABETO",
    message:
      "Este sistema criptográfico utiliza um alfabeto invertido. Recupere a palavra original.",
    code: "W Z W L H",
    hint:
      "Nesta cifra, A corresponde a Z, B corresponde a Y, C corresponde a X, e assim por diante.",
    options: ["DADOS", "CÓDIGO", "LÓGICA"],
    answer: 0,
    explanation:
      "A cifra Atbash inverte o alfabeto. W corresponde a D, Z a A, W a D, L a O e H a S. A palavra é DADOS.",
  },
  {
    title: "CÓDIGO 04 — ARQUIVO SECRETO",
    message:
      "O último arquivo foi protegido por uma cifra de deslocamento. Descubra a mensagem.",
    code: "V H F U H W R",
    hint:
      "Cada letra foi avançada três posições no alfabeto para criar o código. Para decifrar, volte três posições.",
    options: ["SECRETO", "SISTEMA", "ARQUIVO"],
    answer: 0,
    explanation:
      "Voltando três posições no alfabeto, V vira S, H vira E, F vira C, U vira R, H vira E, W vira T e R vira O. A mensagem é SECRETO!",
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

      if (stage === challengeList.length - 1 && onComplete) {
        onComplete({
          id: "central-completed",
          title: "Central de Decodificação concluída",
          text:
            "Os quatro códigos foram decifrados. A investigação criptográfica foi concluída.",
        });
      }
    } else {
      setStageCorrect(false);
      setFeedback(
        "A decodificação não corresponde ao padrão encontrado. Analise o código novamente e tente outra hipótese."
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
                <h2>DECODIFICAÇÃO CONCLUÍDA!</h2>

                <p>
                  Todos os quatro arquivos foram decifrados.
                  Você utilizou diferentes técnicas criptográficas
                  para recuperar as mensagens.
                </p>

                <div className="central-success">
                  ✓ DESAFIO DE DECODIFICAÇÃO CONCLUÍDO
                </div>

                <p>
                  As informações recuperadas podem ajudar
                  a solucionar o caso.
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
                      : "PRÓXIMO CÓDIGO"}
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
