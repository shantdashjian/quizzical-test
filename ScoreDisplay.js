import React from 'react';

const ScoreDisplay = ({ score, totalQuestions, onPlayAgain }) => {
  return (
    <div className="score-display">
      <p>You scored {score} out of {totalQuestions} correct answers</p>
      <button onClick={onPlayAgain} className="button">Play Again</button>
    </div>
  );
};

export default ScoreDisplay;
