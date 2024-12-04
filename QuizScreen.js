import React, { memo } from 'react';
import AnswerButton from './AnswerButton';
import ScoreDisplay from './ScoreDisplay';

const QuizScreen = memo(({
  questions,
  selectedAnswers,
  setSelectedAnswers,
  score,
  answersChecked,
  checkAnswers,
  playAgain,
  loading,
}) => {
  if (loading) return <p>Loading questions...</p>;

  // Check if all questions have been answered
  const allQuestionsAnswered = questions.length > 0 && questions.length === Object.keys(selectedAnswers).length;

  return (
    <div className="quiz-screen">
      {questions.map((question, index) => { return
        <QuestionCard
          key={index}
          question={question}
          selectedAnswer={selectedAnswers[index]}
          onAnswerSelect={(answer) => setSelectedAnswers({ [index]: answer })}
          answersChecked={answersChecked}
        />
      })}
      
      {/* Hide Check Answers button after it is clicked */}
      {!answersChecked && (
        <button 
          onClick={checkAnswers} 
          className="button check-answers-btn" 
          disabled={!allQuestionsAnswered} // Disable if not all questions are answered
        >
          Check Answers
        </button>
      )}

      {/* Show ScoreDisplay which contains Play Again button only after answers are checked */}
      {answersChecked && (
        <ScoreDisplay score={score} totalQuestions={questions.length} onPlayAgain={playAgain} />
      )}
    </div>
  );
});

const QuestionCard = memo(({ question, selectedAnswer, onAnswerSelect, answersChecked }) => {
  const getButtonClass = (answer) => {
    if (selectedAnswer === answer) return 'selected';
    if (answersChecked) {
      if (answer === question.correct_answer) return 'correct';
      if (selectedAnswer === answer) return 'incorrect';
    }
    return '';
  };

  return (
    <div className="question">
      <h3 dangerouslySetInnerHTML={{ __html: question.question }}></h3>
      <ul>
        {question.allAnswers.map((answer) => { return
          <li key={answer}>
            <AnswerButton
              answer={answer}
              className={getButtonClass(answer)}
              onClick={() => onAnswerSelect(answer)}
              disabled={answersChecked}
            />
          </li>
        })}
      </ul>
    </div>
  );
});

export default QuizScreen;
