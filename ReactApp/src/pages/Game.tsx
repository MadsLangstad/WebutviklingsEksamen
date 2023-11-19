import React from 'react';
import Quiz from '../components/game/Quiz';

interface Props {}

const Game: React.FC<Props> = () => {
    return (
        <div>
            <h1 className="text-4xl text-center mt-2">Quiz Game</h1>
            <p className="text-2xl text-center mt-2">This is a game with 10 questions, based on F1 History</p>
            <Quiz />
        </div>
    );
};

export default Game;
