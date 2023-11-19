import React, { useState } from 'react';

// Define the structure of each question
type Question = {
    question: string;
    options: string[];
    answer: string;
};

// Array of questions
const questions: Question[] = [
    {
        question: 'Who won the Formula 1 World Championship in 2020?',
        options: ['Lewis Hamilton', 'Max Verstappen', 'Valtteri Bottas', 'Sebastian Vettel'],
        answer: 'Lewis Hamilton'
    },
    {
        question: 'Which team has won the most Constructors\' Championships in Formula 1 history?',
        options: ['Ferrari', 'Mercedes', 'McLaren', 'Williams'],
        answer: 'Ferrari'
    },
    {
        question: 'Who holds the record for the most pole positions in Formula 1?',
        options: ['Lewis Hamilton', 'Ayrton Senna', 'Michael Schumacher', 'Sebastian Vettel'],
        answer: 'Lewis Hamilton'
    },
    {
        question: 'Which driver has won the most Formula 1 World Championships?',
        options: ['Michael Schumacher', 'Lewis Hamilton', 'Juan Manuel Fangio', 'Sebastian Vettel'],
        answer: 'Lewis Hamilton'
    },
    {
        question: 'Which circuit is known as "The Temple of Speed"?',
        options: ['Monza', 'Silverstone', 'Spa-Francorchamps', 'Monte Carlo'],
        answer: 'Monza'
    },
    {
        question: 'Who is the youngest driver to win a Formula 1 World Championship?',
        options: ['Sebastian Vettel', 'Fernando Alonso', 'Lewis Hamilton', 'Max Verstappen'],
        answer: 'Sebastian Vettel'
    },
    {
        question: 'Which driver has the most Grand Prix victories in Formula 1?',
        options: ['Lewis Hamilton', 'Michael Schumacher', 'Ayrton Senna', 'Sebastian Vettel'],
        answer: 'Lewis Hamilton'
    },
    {
        question: 'Which team has won the most consecutive Constructors\' Championships in Formula 1?',
        options: ['Ferrari', 'Mercedes', 'McLaren', 'Red Bull Racing'],
        answer: 'Mercedes'
    },
    {
        question: 'Who is the only driver to have won the Formula 1 World Championship with a team other than Ferrari, McLaren, or Mercedes?',
        options: ['Nico Rosberg', 'Jenson Button', 'Kimi Räikkönen', 'Fernando Alonso'],
        answer: 'Nico Rosberg'
    },
    {
        question: 'Which driver has the most podium finishes in Formula 1?',
        options: ['Lewis Hamilton', 'Michael Schumacher', 'Sebastian Vettel', 'Kimi Räikkönen'],
        answer: 'Lewis Hamilton'
    },
];


const Quiz: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);

    const handleAnswer = (option: string): void => {
        const nextQuestion = currentQuestion + 1;

        if (option === questions[currentQuestion].answer) {
            setScore(prevScore => {
                const newScore = prevScore + 1;

                if (nextQuestion >= questions.length) {
                    alert(`Quiz finished! Your score is ${newScore}/${questions.length}`);
                    setCurrentQuestion(0);
                    return 0; // Reset the score for the next round
                }

                return newScore;
            });
        } else if (nextQuestion >= questions.length) {
            alert(`Quiz finished! Your score is ${score}/${questions.length}`);
            setCurrentQuestion(0);
            setScore(0);
        }

        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        }
    };

    return (
        <div className="my-5 text-center">
            <div className="mb-5">
                <div className="mb-2 text-3xl">
                    Question {currentQuestion + 1}/{questions.length}
                </div>
                <div className="text-2xl mb-5">{questions[currentQuestion].question}</div>
            </div>
            <div className="flex flex-col items-center">
                {questions[currentQuestion].options.map((option, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleAnswer(option)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Quiz;
