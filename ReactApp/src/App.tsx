import React, { useState } from 'react';
import { DataProvider } from './contexts/DataContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Game } from './pages'
import Header from './components/shared/Header'

function App() {

  const [isLightMode, setIsLightMode] = useState(true);

  const lightMode = localStorage.getItem('lightMode', 'white');

  const setLightDarkMode = (type) => { 
    if (type === 'dark') {
      if (isLightMode === false) {
        return;
      }

      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-white');
      document.body.classList.add('bg-gray-600');
  
    } else if (type === 'light') {
      if (isLightMode === true) {
        return;
      }

      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.classList.remove('bg-gray-600');
      document.body.classList.add('bg-white');
    }

    setIsLightMode(!isLightMode);

    localStorage.setItem('lightMode', type);
  }

  setLightDarkMode(lightMode);

  return (
    <>
        <DataProvider>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home isLightMode={ isLightMode } setIsLightMode={ setIsLightMode } setLightDarkMode={ setLightDarkMode } />}>Api</Route>
                    <Route path="/game" element={<Game isLightMode={ isLightMode } setIsLightMode={ setIsLightMode } setLightDarkMode={ setLightDarkMode } />}>Game</Route>
                </Routes>
            </BrowserRouter>
        </DataProvider>
    </>
  )
}

export default App;
