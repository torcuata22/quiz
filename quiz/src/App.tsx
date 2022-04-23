import React, { useState } from 'react';
import './App.css';
import {fetchQuizQuestions} from './API';
//components:
import QuestionCard from './components/QuestionCard'
//types:
import { QuestionState, Difficulty } from './API';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;
const App = () =>   {
  const [loading, setloading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setStcore] = useState(0)
  const [gameOver, setGameOver] = useState(true);

  //console.log(questions);


  
  const startTrivia = async () => {
    setloading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setStcore(0);
    setUserAnswers([]);
    setNumber(0);
    setloading(false);

  }; 
  
  const checkAnswer = (e: React.MouseEvent <HTMLButtonElement>) => {

  }

  const nextQuestion = () => {};
  return (
    <div className="App">
         <h1>Book Trivia</h1>
         {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
              Start
          </button>
         ) : null}
         {!gameOver ? <p className="score"> Score: </p> : null}
         {loading && <p>next question...</p>}
         <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
  callback={checkAnswer} />
         
         <p></p>
         <button className="next" onClick={nextQuestion}>Next Question</button>

    </div>
  );
}

export default App;
