import React, { useState } from 'react'
import './Quiz.css'
import QuizFrame from '../components/QuizFrame';
import axios from "axios";
import { useAppContext } from '../context/AppContext';
import QuizGame from '../components/QuizGame';

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);



const Quiz = () => {
  const {
    quizUser, setQuizUser,
    quizRegion, setQuizRegion
  } = useAppContext();
  
  //3 different phase or screen of quiz - start | running | finished
  const [stage, setStage] = useState("start");  // “start” is the first phase of quiz
  
  
  
  //const [index, setIndex] = useState(0); // which question we are on
  //const [score, setScore] = useState(0);


  const handleStart = () => {
    if (!quizUser.trim()) return alert("Enter username"); //backup safety -this is extra as i have put on button disabled...if by any change that not work then this will come in use
   
    setStage("running")
  };

  if (stage === "running") {
    return <QuizGame setStage={setStage} />;
  }
    // conditionally show one screen or another - start | running | finished
  if (stage === "start") {
    return (
      <QuizFrame 
        title="🏳️ Flag Quiz Challenge"
        subtitle="Test your knowledge of world flags!"
      >
      
          <div className='quiz-form'>
            <div className="input-group">
                <label className="input-label">👤 Your Name:&nbsp;</label>
                <input 
                  value={quizUser} 
                  onChange={e => setQuizUser(e.target.value)} 
                  className="quiz-input" 
                  placeholder="Enter your name" 
                  type="text"
                  autoComplete="name"
                />
            </div>
            <div className="input-group">
              <label className="input-label">🌍 Select Region</label>
              <select
                className="quiz-select"
                value={quizRegion}
                onChange={(e) => setQuizRegion(e.target.value)}
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
              onClick={handleStart}
              disabled={!quizUser.trim()} // button remains disabled until name or text is written              
            >
              🚀 Start Quiz
            </button>
          </div>
      </QuizFrame>  
      
    );
  } 
      return <p>Something went wrong. Please refresh the page.</p>;
  

};

export default Quiz