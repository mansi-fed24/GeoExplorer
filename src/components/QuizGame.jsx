import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import axios from 'axios';
import QuizFrame from './QuizFrame';


const countryAPI = "https://restcountries.com/v3.1";

const QuizGame = ({setStage}) => { //accept setStage as a prop- so we can go back to start when the quiz is done
    const {
        quizRegion,   //get global variables from context
        quizUser,
        setQuizScore,
        leaderboard,
        setLeaderboard
    } = useAppContext();

    // local state variables
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState(""); // show answer was correct / incorrect
    
    //fetch countries
    useEffect(() => {
      const fetchCountries = async () => {
        setLoading(true);
        try{
          const url = `${countryAPI}/region/${quizRegion.toLowerCase()}?fields=name,flags`;
          const res = await axios.get(url);
          const shuffled = [...res.data].sort(() => Math.random() - 0.5);
          const selected = shuffled.slice(0,15);
          // 
          setQuestions(selected);
        } catch (err) {
            alert("Failed to load countries for the Quiz")

        }
          finally {
            setLoading(false)
        }
      };
        fetchCountries();
      }, [quizRegion]);
        
    

    const handleSubmit = (e) => {
      e.preventDefault();

      //gets the correct country name (correctName) and compares it to user typed (userGuess)
      const correctName = questions[index]?.name.common.toLowerCase().trim();
      const userGuess = userAnswer.toLowerCase().trim();

      if (userGuess === correctName) {
        setScore(score + 1);
        setFeedback("Correct Answer!");
      } else {
        setFeedback (`Wrong! Answer: ${questions[index]?.name.common} `);
      }

      // setTimeout used to display new question after every1.2 seconds of display feedback-as i have not put any button for next question 
      setTimeout(() => {
        setFeedback("");
        setUserAnswer("");
        if (index < questions.length - 1) {
          setIndex(index + 1);
        } else {
          finishQuiz();
        }
      }, 1200);
  };
      const finishQuiz = () => {
      setShowResult(true);
      setQuizScore(score);

      const result = {
        username: quizUser,
        region: quizRegion,
        score: score
      };

      setLeaderboard([...leaderboard, result]);
    };

  
    if (loading) {
      return <p className="quiz-form">Loading quiz...</p>;
    }

    if (!questions.length) {
      return <p className="quiz-form">No questions found.</p>;
    }

    if (showResult) {
      return (
        <QuizFrame title="🎉 Quiz Complete!">
          <p style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
            Well done, <strong>{quizUser}</strong>!
          </p>
          <p style={{ fontSize: "1.1rem" }}>
            You scored <strong>{score}</strong> out of {questions.length} in <strong>{quizRegion}</strong>.
          </p>

          <button 
            className="quiz-start-btn"
            onClick={() => setStage("start")}
            style={{ marginTop: "2rem" }}
          >
            🔁 Play Again
          </button>
        </QuizFrame>
      );
    }

    // show current question
    const currentCountry = questions[index]; // current country object
    const flagUrl = currentCountry?.flags?.svg; // flag image

    return (
  <QuizFrame title={`Question ${index + 1} of ${questions.length}`}>
    <img
      src={flagUrl}
      alt="Country flag"
      className="quiz-flag"
    />

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="quiz-input"
        placeholder="Enter country name"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        autoFocus
      />
      <button type="submit" className="quiz-start-btn" style={{ marginTop: "1rem" }}>
        Submit Answer
      </button>
    </form>

    {feedback && <p className="feedback">{feedback}</p>}
  </QuizFrame>
);
 

};

export default QuizGame;