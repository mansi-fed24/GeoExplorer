import React from 'react';
import { useAppContext } from '../context/AppContext';
import QuizFrame from '../components/QuizFrame';

const Leaderboard = () => {
  const { leaderboard } = useAppContext();

  const grouped = leaderboard.reduce((acc, entry) => {
    const { region } = entry;
    if (!acc[region]) acc[region] = [];
    acc[region].push(entry);
    return acc;
  }, {});

  return (
  <QuizFrame title="🏆 Leaderboard">
    {Object.keys(grouped).map((region) => (
      <div key={region} className="leaderboard-group">
        <h2 className="leaderboard-region">{region}</h2>
        <ul className="leaderboard-list">
          {grouped[region]
            .sort((a, b) => b.score - a.score)
            .map((entry, index) => (
              <li key={index} className="leaderboard-entry">
                <strong>{entry.username}</strong>: {entry.score} pts
              </li>
            ))}
        </ul>
      </div>
    ))}
  </QuizFrame>
  );
};

export default Leaderboard;

