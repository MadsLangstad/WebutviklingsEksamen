import { useState } from 'react';
import { DataProvider } from './contexts/DataContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Game } from './pages'
import Header from './components/shared/Header'

function App() {

  const [isLightMode, setIsLightMode] = useState(true);

  let lightMode = localStorage.getItem('lightMode');

  const setLightDarkMode = (type: string) => {
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

    localStorage.setItem('lightMode', type);

    setIsLightMode(!isLightMode);
  }

  if (lightMode === null) {
    lightMode = 'light';
  }

  setLightDarkMode(lightMode);

  return (
    <>
        <DataProvider>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home isLightMode={ isLightMode } setLightDarkMode={ setLightDarkMode } />}>Api</Route>
                    <Route path="/game" element={<Game isLightMode={ isLightMode } setLightDarkMode={ setLightDarkMode } />}>Game</Route>
                </Routes>
            </BrowserRouter>
        </DataProvider>
    </>
  )
}

export default App;
