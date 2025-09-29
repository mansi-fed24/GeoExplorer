import React from "react";

const Start = () => {
  return (
    <main className="start-page">
      <section className="hero">
        {/* Left: text */}
        <div className="hero-left">
          <h1 className="hero-title">
            🌍 Welcome to <span className="brand">GeoExplorer</span>
          </h1>
          <p className="hero-subtitle">
            Explore countries, learn about their cultures, and challenge yourself with fun quizzes.
          </p>
        </div>

        {/* Right: visual placeholder (we’ll enhance later) */}
        <div className="hero-right">
          <div className="globe-placeholder">🌍</div>
        </div>
      </section>
    </main>
  );
};

export default Start;
