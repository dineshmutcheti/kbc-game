import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // or use QRCodeSVG
import './App.css';

const questionsList = [
  {
    question: "What is the capital of France?",
    options: ["A. Berlin", "B. Madrid", "C. Paris", "D. Rome"],
    correct: "C"
  },
  {
    question: "Who wrote 'Harry Potter'?",
    options: ["A. J.K. Rowling", "B. J.R.R. Tolkien", "C. George R.R. Martin", "D. Agatha Christie"],
    correct: "A"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["A. Earth", "B. Jupiter", "C. Saturn", "D. Mars"],
    correct: "B"
  },
  {
    question: "Which year did World War I begin?",
    options: ["A. 1914", "B. 1918", "C. 1939", "D. 1945"],
    correct: "A"
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["A. Isaac Newton", "B. Nikola Tesla", "C. Albert Einstein", "D. Galileo Galilei"],
    correct: "C"
  }
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const handleAnswerSubmission = (playerName, answer) => {
    const currentQuestion = questionsList[currentQuestionIndex];
    if (answer === currentQuestion.correct) {
      setIsAnswerCorrect(`${playerName}, Congratulations! Correct answer.`);
      setPlayers([...players, playerName]); // Save player
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswerCorrect(null); // Reset answer feedback
      }, 2000);
    } else {
      alert(`${playerName}, sorry, that's incorrect.`);
    }
  };

  return (
    <div className="App">
      <h1>KBC Game</h1>
      {currentQuestionIndex < questionsList.length ? (
        <>
          <h2>Question: {questionsList[currentQuestionIndex].question}</h2>
          <ul>
            {questionsList[currentQuestionIndex].options.map(option => (
              <li key={option}>{option}</li>
            ))}
          </ul>
          <QRCodeCanvas value="http://localhost:3000/play" />
          <h4>Scan QR to Join the Game</h4>

          <PlayerForm onAnswerSubmit={handleAnswerSubmission} />

          {isAnswerCorrect && <h3>{isAnswerCorrect}</h3>}
        </>
      ) : (
        <h2>Game Over! Thanks for playing.</h2>
      )}
    </div>
  );
}

function PlayerForm({ onAnswerSubmit }) {
  const [name, setName] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && answer) {
      onAnswerSubmit(name, answer);
    } else {
      alert("Please fill in your name and answer.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Enter Your Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Select Your Answer: </label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="A/B/C/D"
          required
        />
      </div>
      <button type="submit">Submit Answer</button>
    </form>
  );
}

export default App;
