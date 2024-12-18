import React from 'react';
import Quiz from '../components/game/Quiz';

interface IProps {
    isLightMode: boolean,
    setLightDarkMode: (type: string) => void
}

const Game: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            <div className="flex flex-row justify-end mt-10 mr-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill={ props.isLightMode ? 'none' : 'black' } viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 mr-8${ props.isLightMode ? '' : ' cursor-pointer'}`} onClick={() => props.setLightDarkMode('light')}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill={ props.isLightMode ? 'black' : 'none' } viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6${ props.isLightMode ? ' cursor-pointer' : ''}`} onClick={() => props.setLightDarkMode('dark')}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
            </div>

            <h1 className="text-4xl text-center mt-2">Quiz Game</h1>
            <p className="text-2xl text-center mt-2">This is a game with 10 questions, based on F1 History</p>
            <Quiz />
        </>
    );
};

export default Game;
