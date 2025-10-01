import React from "react";



const Start = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            🌍 Welcome to <span className="gradient-text px-12 m-12">GeoExplorer</span>
          </h1>

          <p className="hero-subtitle">
           From flags and capitals to regions and languages, GeoExplorer turns geography into simple, visual lessons. Build a personal collection, challenge yourself with quizzes, and see how you rank.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">195+</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">Regions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Knowledge</div>
            </div>
          </div>
        </div>

        {/* Right visual: floating flags */}
        <div className="hero-visual">
          <div className="floating-flags">
            <div className="flag-emoji">🏳️</div>
            <div className="flag-emoji">🇺🇸</div>
            <div className="flag-emoji">🇫🇷</div>
            <div className="flag-emoji">🇯🇵</div>
            <div className="flag-emoji">🇧🇷</div>
            <div className="flag-emoji">🇦🇺</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;


