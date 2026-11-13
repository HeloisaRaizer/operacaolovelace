
import React, { useState } from "react";

const challenges = [
  {
    id: 1,
    title: "ANÁLISE DE DADOS",
    description:
      "O laboratório encontrou três registros. Qual procedimento ajuda a identificar informações inconsistentes?",
    options: [
      "Ignorar os dados diferentes",
      "Verificar e comparar os registros",
      "Excluir todos os registros",
    ],
    answer: 1,
    explanation:
      "Comparar os registros permite identificar inconsistências sem descartar informações importantes.",
  },
  {
    id: 2,
    title: "PADRÕES ESCONDIDOS",
    description:
      "Um sistema encontrou comportamentos semelhantes em vários conjuntos de dados. O que devemos investigar?",
    options: [
      "Os padrões presentes nos dados",
      "Somente o tamanho dos arquivos",
      "A cor da interface do sistema",
    ],
    answer: 0,
    explanation:
      "A identificação de padrões pode revelar relações importantes entre diferentes informações.",
  },
  {
    id: 3,
    title: "VALIDAÇÃO FINAL",
    description:
      "Antes de registrar uma descoberta, qual atitude é mais adequada?",
    options: [
      "Aceitar o primeiro resultado",
      "Ignorar possíveis erros",
      "Validar o resultado com as evidências",
    ],
    answer: 2,
    explanation:
      "Uma conclusão confiável precisa ser verificada com base nas evidências disponíveis.",
  },
];

export default function Laboratory({
  onExit,
  onComplete,
}) {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);

  const challenge = challenges[challengeIndex];

  const verifyAnswer = () => {
    if (selectedAnswer === "") {
      setFeedback("Escolha uma alternativa antes de continuar.");
      return;
    }

    if (Number(selectedAnswer) === challenge.answer) {
      setFeedback(`CORRETO! ${challenge.explanation}`);

      if (challengeIndex === challenges.length - 1) {
        setCompleted(true);

        if (onComplete) {
          onComplete({
            id: "laboratorio-evidencia",
            title: "Relatório de análise do laboratório",
            text:
              "O laboratório confirmou que as informações precisam ser comparadas, analisadas e validadas antes de uma conclusão.",
          });
        }
      }
    } else {
      setFeedback(
        "Resultado incorreto. Analise novamente as informações e tente outra alternativa."
      );
    }
  };

  const nextChallenge = () => {
    setChallengeIndex((previous) => previous + 1);
    setSelectedAnswer("");
    setFeedback("");
  };

  const restartChallenge = () => {
    setChallengeIndex(0);
    setSelectedAnswer("");
    setFeedback("");
    setCompleted(false);
  };

  return (
    <main className="laboratory-screen">
      <header className="game-header">
        <div>
          <span className="eyebrow">OPERAÇÃO LOVELACE</span>
          <h2>Laboratório Digital</h2>
        </div>

        <button className="close-button" onClick={onExit}>
          VOLTAR
        </button>
      </header>

      <section className="laboratory-stage">
        <div
          className="laboratory-scene"
          style={{
            backgroundImage: `url("${process.env.PUBLIC_URL}/cenarios/laboratorio.png")`,
          }}
        >
          <div className="laboratory-console">
            <span className="eyebrow">TERMINAL DE ANÁLISE</span>

            <h2>
              {completed
                ? "ANÁLISE CONCLUÍDA"
                : challenge.title}
            </h2>

            {completed ? (
              <>
                <p>
                  Todos os desafios foram concluídos. O relatório
                  foi liberado para a investigação.
                </p>

                <div className="laboratory-success">
                  <span>✓</span>
                  <strong>EVIDÊNCIA DESBLOQUEADA</strong>
                </div>

                <button
                  className="start-button"
                  onClick={onExit}
                >
                  CONTINUAR INVESTIGAÇÃO
                </button>

                <button
                  className="close-button"
                  onClick={restartChallenge}
                >
                  REFAZER DESAFIOS
                </button>
              </>
            ) : (
              <>
                <div className="laboratory-progress">
                  DESAFIO {challengeIndex + 1} DE {challenges.length}
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        ((challengeIndex + 1) / challenges.length) * 100
                      }%`,
                    }}
                  />
                </div>

                <p>{challenge.description}</p>

                <div className="laboratory-options">
                  {challenge.options.map((option, index) => (
                    <button
                      key={option}
                      className={`laboratory-option ${
                        selectedAnswer === String(index)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedAnswer(String(index));
                        setFeedback("");
                      }}
                    >
                      <span>{String.fromCharCode(65 + index)}</span>
                      {option}
                    </button>
                  ))}
                </div>

                {feedback && (
                  <div className="laboratory-feedback">
                    {feedback}
                  </div>
                )}

                {!feedback.includes("CORRETO!") ? (
                  <button
                    className="start-button"
                    onClick={verifyAnswer}
                  >
                    ANALISAR RESPOSTA
                  </button>
                ) : (
                  <button
                    className="start-button"
                    onClick={nextChallenge}
                  >
                    {challengeIndex === challenges.length - 1
                      ? "FINALIZAR ANÁLISE"
                      : "PRÓXIMO DESAFIO"}
                  </button>
                )}
              </>
            )}
          </div>

          <img
            className="scene-ada"
            src={`${process.env.PUBLIC_URL}/personagens/ada.png`}
            alt="Ada Lovelace"
          />

          <div className="scene-ada-speech">
            <strong>Ada</strong>
            <span>
              Analise com cuidado. Nem todo resultado é uma evidência confiável!
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
