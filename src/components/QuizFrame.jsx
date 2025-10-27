import React from "react";



const QuizFrame = ({ title, subtitle, children }) => {
  return (
    <main className="quiz-page">
      <section className="quiz-card">
        <header className="quiz-header">
          <h1 className="quiz-title">{title}</h1>
          {subtitle && <p className="quiz-subtitle">{subtitle}</p>}
        </header>
        {children}
      </section>
    </main>
  );
};

export default QuizFrame;
