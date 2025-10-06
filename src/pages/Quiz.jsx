import React, { useEffect, useState } from 'react'
import "./Quiz.css"

// simple shuffle for randomizing options
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const MOCK_QUESTIONS = [
  { name: { common: "Sweden" },  flag: "🇸🇪" },
  { name: { common: "India" },   flag: "🇮🇳" },
  { name: { common: "Japan" },   flag: "🇯🇵" },
  { name: { common: "Germany" }, flag: "🇩🇪" },
];

const Quiz = () => {
  const [stage, setStage] = useState("start"); // start | running | finished
  const [username, setUsername] = useState(""); //variable to store input value
  const [region, setRegion] = useState("Europe");
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0); //0 means the first question
  const [score, setScore] = useState(0); //initial score 0

  const begin = () => {
    if (!username.trim()) return alert("Enter username");
    setStage("running");
  };

  const handleAnswer = (choice) => {
      // 1) what is the correct answer for the current question?
      const correct = questions[index].name.common;

      // 2) compare the clicked choice with the correct answer
      const isCorrect = choice === correct;

      // 3) if correct, increment score
      if (isCorrect) setScore((s) => s + 1);

      // 4) decide if this was the last question
      const isLast = index + 1 >= questions.length;

      // 5) either finish the quiz or go to the next question
      if (isLast) {
        setStage("finished");
      } else {
        setIndex((i) => i + 1);
      }
  };

  useEffect(() => {
  if (stage !== "running") return;  // only act right when the quiz starts

  setScore(0);                      // reset score at the start of a run
  setIndex(0);                      // start at the first question
  setQuestions(MOCK_QUESTIONS);     // load  mock questions array
}, [stage]);

  if (stage === "start") {
    return (
      <main className='quiz-page'>
        <section className='quiz-card'>
          <header className='quiz-header'>
            <h1 className='quiz-title'>🏳️ Flag Quiz Challenge</h1>
            <p className='quiz-subtitle'>Test your knowledge of world flags!</p>
          </header>

          <div className='quiz-form'>
            <div className="input-group">
                <label className="input-label">👤 Your Name</label>
                <input 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  className="quiz-input" 
                  placeholder="Enter your name here..." 
                  type="text"
                  autoComplete="name"
                />
            </div>
            <div className="input-group">
              <label className="input-label">🌍 Select Region</label>
              <select
                className="quiz-select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option>Africa</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>North America</option>
                <option>South America</option>
                <option>Oceania</option>
                <option>Antarctica</option>
              </select>
            </div>
            <button 
                className="quiz-start-btn" 
                onClick={begin}
                disabled={!username.trim()}
            >
              🚀 Start Quiz
            </button>
          </div>
          

        </section>
      </main>
    );
  };
  // RUNNING view — show Question 1 (read-only for now)
  if (stage === "running") {
    const q = questions[index];           // the current question (may be undefined for a moment)

  // Loading fallback while the effect sets questions
  if (!q) {
    return (
    
      <main className="quiz-page">
        <section className="quiz-card">
          <header className="quiz-header">
            <h1 className="quiz-title">🏳️ Flag Quiz Challenge</h1>
            <p className="quiz-subtitle">Test your knowledge of world flags!</p>
          </header>

          <div className="quiz-running" style={{ padding: "1rem" }}>
            loading...
            

            
          </div>
        </section>
      </main>
    );
  };
   const progress = Math.round(((index + 1) / questions.length) * 100);

  // Actual question UI
    return (
      <main className="quiz-page">
          <section className="quiz-card">
            <header className="quiz-header">
              <h1 className="quiz-title">🏳️ Flag Quiz Challenge</h1>
              <p className="quiz-subtitle">Good luck, {username || "Player"}!</p>
            </header>

            <div className="quiz-running" style={{ paddingBottom: "1.25rem" }}>
              {/* simple progress text */}
              <div className="quiz-progress">
            <div className="progress-bar" aria-hidden="true">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="progress-text">
              Question {index + 1} of {questions.length} — {progress}%
            </div>
          </div>

              {/* the flag */}
              <div className="flag" aria-label={`${q.name.common} flag`} style={{ fontSize: 64, lineHeight: 1, margin: "0.75rem 0" }}>
                {q.flag}
              </div>

              {/* the prompt */}
              <h2 className="prompt" style={{ marginTop: 0 }}>
                Which country’s flag is this?
              </h2>

              {/* add 4 options*/}
              {(() => {
                // a) identify correct answer for this question
                const correct = q.name.common;

                // b) build a pool of other names from the questions list
                const pool = questions
                  .map((c) => c.name.common)
                  .filter((n) => n !== correct);       // exclude the correct one

                // c) take 3 wrong answers from the pool
                const wrong = shuffle(pool).slice(0, 3);

                // d) combine and shuffle so the correct position is random
                const options = shuffle([correct, ...wrong]);

                // e) render as buttons
                return (
                  <div className="quiz-options">
                    {options.map((opt) => (
                      <button
                        key={opt}
                        className="quiz-option"
                        onClick={() => handleAnswer(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                );
              })()}

            </div>
          </section>
      </main>
    );
  };
    // ---- FINISHED view ----
  if (stage === "finished") {
    const total = questions.length || 1;                  // avoid divide-by-zero
    const percentage = Math.round((score / total) * 100); // show % nicely

    // friendly message based on score (optional)
    const message =
      percentage >= 90 ? "🏆 Outstanding! You're a flag pro!" :
      percentage >= 70 ? "🎉 Great job! Well done!" :
      percentage >= 50 ? "👍 Good effort! Keep practicing!" :
                        "💪 Keep learning! You'll get there!";

    return (
      <main className="quiz-page">
        <section className="quiz-card">
          <header className="quiz-header">
            <h1 className="quiz-title">🎯 Quiz Complete!</h1>
            <p className="quiz-subtitle">
              {message} — {username || "Player"}
            </p>
          </header>

          <div className="quiz-running" style={{ paddingBottom: "1.25rem" }}>
            <p className="progress muted">Your Score</p>
            <h2 className="prompt" style={{ marginTop: 8 }}>
              {score} / {total} ({percentage}%)
            </h2>

            <div className="quiz-actions" style={{ marginTop: 16 }}>
              <button
                className="quiz-start-btn"
                onClick={() => {
                  // reset for a fresh run
                  setQuestions([]);
                  setIndex(0);
                  setScore(0);
                  setStage("start");
                }}
              >
                🔄 Play Again
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

};
export default Quiz;