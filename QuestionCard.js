import React, { memo, useCallback } from 'react';
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
  error,
}) => {
  if (loading) return <p>Loading questions...</p>;
  if (error) return <ErrorDisplay error={error} onRetry={playAgain} />;

  return (
    <div className="quiz-screen">
      {questions.map((question, index) => {return 
        <QuestionCard
          key={index}
          question={question}
          selectedAnswer={selectedAnswers[index]}
          onAnswerSelect={(answer) => setSelectedAnswers({ [index]: answer })}
          answersChecked={answersChecked}
        />
      })}
      {!answersChecked && questions.length > 0 && (
        <button onClick={checkAnswers} className="check-answers-btn">
          Check Answers
        </button>
      )}
      {answersChecked && (
        <ScoreDisplay score={score} totalQuestions={questions.length} onPlayAgain={playAgain} />
      )}
    </div>
  );
});

const ErrorDisplay = memo(({ error, onRetry }) => (
  <div>
    <p>{error}</p>
    <button onClick={onRetry}>Try Again</button>
  </div>
));

const QuestionCard = memo(({ question, selectedAnswer, onAnswerSelect, answersChecked }) => {
  const getButtonClass = useCallback((answer) => {
    if (selectedAnswer === answer) return 'selected';
    if (answersChecked) {
      if (answer === question.correct_answer) return 'correct';
      if (selectedAnswer === answer) return 'incorrect';
    }
    return '';
  }, [selectedAnswer, answersChecked, question.correct_answer]);

  return (
    <div className="question">
      <h3 dangerouslySetInnerHTML={{ __html: question.question }}></h3>
      <ul>
        {question.allAnswers.map((answer) => (
          <li key={answer}>
            <AnswerButton
              answer={answer}
              className={getButtonClass(answer)}
              onClick={() => onAnswerSelect(answer)}
              disabled={answersChecked}
            />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default QuizScreen;
