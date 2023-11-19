import { DataProvider } from './contexts/DataContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Game } from './pages'
import Header from './components/shared/Header'


function App() {

  return (
    <>
        <DataProvider>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}>Api</Route>
                    <Route path="/game" element={<Game/>}>Game</Route>
                </Routes>
            </BrowserRouter>
        </DataProvider>
    </>
  )
}

export default App;
