import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between h-20 px-5 bg-black text-white border-4 border-black">
            <div className="flex items-center">
                <h1 className="text-3xl m-0">Formula One</h1>
            </div>
            <ul className="flex m-0 p-0 gap-5">
                <li><a href="#" className="no-underline text-white">API</a></li>
                <li><a href="/" className="no-underline text-white">Game</a></li>
                <li><a href="/" className="no-underline text-white">Documentation</a></li>
                <li><a href="/" className="no-underline text-white">About</a></li>
            </ul>
        </header>
    )
}

export default Header;

