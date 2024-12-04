import React, { useState, useCallback, useMemo } from 'react';
import StartScreen from './StartScreen';
import QuizScreen from './QuizScreen';
import Loading from './Loading';

const API_URL = 'https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple';

const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};

const App = React.memo(() => {
    const [gameState, setGameState] = useState({
        started: false,
        loading: false,
        error: null,
        questions: [],
        selectedAnswers: {},
        score: null,
        answersChecked: false,
    });

    const fetchQuestions = useCallback(async () => {
        setGameState(prev => {return { ...prev, loading: true }});

        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.response_code !== 0) {
                throw new Error('Failed to fetch questions. Please try again.');
            }

            const questions = data.results.map(question => {return {
                ...question,
                allAnswers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
            }});

            setGameState(prev => {return {
                ...prev,
                questions,
                loading: false,
                selectedAnswers: {},
                score: null,
                answersChecked: false,
            }});
        } catch (error) {
            setGameState(prev => {return{
                ...prev,
                error: error.message,
                loading: false,
            }});
        }
    }, []);

    const startGame = useCallback(() => {
        setGameState(prev => {return { ...prev, started: true }});
        fetchQuestions();
    }, [fetchQuestions]);

    const checkAnswers = useCallback(() => {
        const correctCount = gameState.questions.reduce((count, question, index) => {
            return count + (gameState.selectedAnswers[index] === question.correct_answer ? 1 : 0);
        }, 0);

        setGameState(prev => {return {
            ...prev,
            score: correctCount,
            answersChecked: true,
        }});
    }, [gameState.questions, gameState.selectedAnswers]);

    const playAgain = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setGameState(prev => {return {
            ...prev,
            loading: false,
            error: null,
            questions: [],
            selectedAnswers: {},
            score: null,
            answersChecked: false,
        }});
        fetchQuestions();
    }, [fetchQuestions]);

    const setSelectedAnswers = useCallback((newAnswers) => {
        setGameState(prev => {return {
            ...prev,
            selectedAnswers: { ...prev.selectedAnswers, ...newAnswers },
        }});
    }, []);

    const memoizedQuizScreen = useMemo(() => {return 
        <QuizScreen
            {...gameState}
            setSelectedAnswers={setSelectedAnswers}
            checkAnswers={checkAnswers}
            playAgain={playAgain}
        />
    }, [gameState, setSelectedAnswers, checkAnswers, playAgain]);

    return (
        <>
            <div className="blob blob1"></div>
            <div className="blob blob2"></div>
            <div className="app-container">
                {gameState.loading && <Loading />}
                {!gameState.started ? (
                    <StartScreen onStartGame={startGame} />
                ) : (
                    memoizedQuizScreen
                )}
            </div>
        </>
    );
});

export default App;
