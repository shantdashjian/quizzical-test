import React from 'react';

const StartScreen = ({ onStartGame }) => {
  return (
    <div className="start-screen">
      <h1>Quizzical</h1>
      <h2>World Geography Trivia</h2>
      <button className="start-btn" onClick={onStartGame}>
        Start quiz
      </button>
    </div>
  );
};

export default StartScreen;