import React, { useEffect, useMemo, useState } from "react";

const normalize = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toUpperCase();

export default function ChallengeRoom({
  location,
  title,
  researcher,
  challenges = [],
  clues = [],
  onClue,
  onComplete,
  onExit,
}) {
  const foundIds = useMemo(
    () => new Set(clues.map((c) => String(c.id))),
    [clues]
  );

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [typed, setTyped] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setIndex(0);
    setSelected(null);
    setTyped("");
    setFeedback(null);
    setFinished(false);
  }, [researcher?.id, location]);

  const current = challenges[index];
  const locationChallenges = challenges;

  function check() {
    if (!current || feedback) return;

    const submitted = current.type === "quiz" ? selected : typed;

    if (
      submitted === null ||
      submitted === undefined ||
      String(submitted).trim() === ""
    ) {
      setFeedback({
        correct: false,
        message: "Selecione ou digite sua resposta para conferir.",
      });
      return;
    }

    let correct = false;

    if (current.type === "quiz") {
      correct = Number(selected) === Number(current.answer);
    } else {
      const userAnswer = normalize(typed);

      const acceptedAnswers = [
        current.answer,
        ...(current.acceptedAnswers || []),
      ].map(normalize);

      correct = acceptedAnswers.includes(userAnswer);
    }

    setFeedback({
      correct,
      message: correct
        ? current.success
        : "Ainda não! Revise o enigma e tente novamente.",
    });

    if (correct && !foundIds.has(String(current.id))) {
      onClue?.({
        id: current.id,
        title: current.title,
        text: current.clue,
        location,
        challenge: current.id,
      });
    }
  }

  function advance() {
    if (!feedback?.correct) return;

    if (index < locationChallenges.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
      setTyped("");
      setFeedback(null);
    } else {
      setFinished(true);
      onComplete?.(location);
    }
  }

  if (!current) {
    return (
      <main className="challenge-room">
        <p>Não há desafios carregados neste local.</p>
        <button onClick={onExit}>Voltar</button>
      </main>
    );
  }

  return (
    <main
      className="challenge-room"
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "#151326",
        color: "#f5e8d0",
      }}
    >
      <section
        className="challenge-card"
        style={{
          width: "min(920px, 96vw)",
          background: "#27223b",
          border: "2px solid #8d6b9d",
          borderRadius: 16,
          padding: "clamp(18px, 3vw, 34px)",
          boxShadow: "0 12px 32px #0006",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <small style={{ letterSpacing: 2, color: "#d7b3ef" }}>
              OPERAÇÃO LOVELACE • {title.toUpperCase()}
            </small>

            <h2 style={{ margin: "8px 0" }}>{title}</h2>
          </div>

          <button type="button" onClick={onExit} style={buttonStyle}>
            SAIR ×
          </button>
        </header>

        {finished ? (
          <div style={{ textAlign: "center", padding: 24 }}>
            <h2>✓ Local concluído!</h2>

            <p>
              Você resolveu os dois desafios e recuperou as pistas deste local.
            </p>

            <button style={buttonStyle} onClick={onExit}>
              VOLTAR À CIDADE
            </button>
          </div>
        ) : (
          <>
            <div style={{ margin: "20px 0 10px", color: "#d7b3ef" }}>
              DESAFIO {index + 1} DE {locationChallenges.length}
            </div>

            <div
              style={{
                height: 8,
                background: "#493c5d",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${
                    ((index + 1) / locationChallenges.length) * 100
                  }%`,
                  height: "100%",
                  background: "#d4a9f5",
                }}
              />
            </div>

            <h2 style={{ marginTop: 22 }}>{current.title}</h2>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                margin: "14px 0",
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/personagens/ada.png`}
                alt="Ada"
                style={{ width: 64, objectFit: "contain" }}
              />

              <div
                style={{
                  background: "#f0dfbd",
                  color: "#39234b",
                  padding: 14,
                  borderRadius: 10,
                  whiteSpace: "pre-line",
                  flex: 1,
                }}
              >
                <strong>ADA</strong>
                <p style={{ marginBottom: 0 }}>{current.ada}</p>
              </div>
            </div>

            <p>{current.question}</p>

            {current.cipher && (
              <div
                style={{
                  padding: 14,
                  borderRadius: 10,
                  background: "#17152a",
                  border: "1px dashed #b9a0cf",
                  fontSize: "clamp(18px, 4vw, 28px)",
                  letterSpacing: 3,
                  textAlign: "center",
                  fontWeight: 800,
                }}
              >
                {current.cipher}
              </div>
            )}

            {current.type === "quiz" ? (
              <div style={{ display: "grid", gap: 10, margin: "20px 0" }}>
                {current.options.map((option, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => !feedback && setSelected(i)}
                    disabled={Boolean(feedback)}
                    style={{
                      ...optionStyle,
                      borderColor: selected === i ? "#d4a9f5" : "#67567e",
                      background: selected === i ? "#483a60" : "#312b46",
                      textAlign: "left",
                    }}
                  >
                    <strong>{String.fromCharCode(65 + i)}.</strong> {option}
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ margin: "20px 0" }}>
                <label
                  htmlFor="challenge-answer"
                  style={{ display: "block", marginBottom: 8 }}
                >
                  Digite a resposta:
                </label>

                <input
                  id="challenge-answer"
                  autoComplete="off"
                  value={typed}
                  onChange={(e) => !feedback && setTyped(e.target.value)}
                  disabled={Boolean(feedback)}
                  placeholder="Sua resposta"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: 12,
                    borderRadius: 8,
                    fontSize: 18,
                  }}
                />
              </div>
            )}

            {feedback && (
              <div
                style={{
                  margin: "16px 0",
                  padding: 14,
                  borderRadius: 10,
                  background: feedback.correct ? "#234535" : "#512c37",
                  border: `1px solid ${
                    feedback.correct ? "#60b97b" : "#e17878"
                  }`,
                }}
              >
                <strong>
                  {feedback.correct
                    ? "✓ Resposta correta!"
                    : "✕ Resposta incorreta"}
                </strong>

                <p style={{ marginBottom: 0 }}>{feedback.message}</p>

                {feedback.correct && (
                  <p style={{ marginBottom: 0, marginTop: 10 }}>
                    <strong>Pista registrada:</strong> {current.clue}
                  </p>
                )}
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 20,
              }}
            >
              {!feedback ? (
                <button
                  style={buttonStyle}
                  onClick={check}
                  disabled={
                    current.type === "quiz"
                      ? selected === null
                      : !typed.trim()
                  }
                >
                  CONFERIR RESPOSTA
                </button>
              ) : feedback.correct ? (
                <button style={buttonStyle} onClick={advance}>
                  {index < locationChallenges.length - 1
                    ? "PRÓXIMO DESAFIO →"
                    : "CONCLUIR LOCAL"}
                </button>
              ) : (
                <button
                  style={buttonStyle}
                  onClick={() => setFeedback(null)}
                >
                  TENTAR NOVAMENTE
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

const buttonStyle = {
  padding: "12px 18px",
  borderRadius: 8,
  border: "1px solid #d4a9f5",
  background: "#594272",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};

const optionStyle = {
  padding: "14px",
  border: "2px solid",
  borderRadius: 10,
  color: "#f5e8d0",
  cursor: "pointer",
  fontSize: 16,
};