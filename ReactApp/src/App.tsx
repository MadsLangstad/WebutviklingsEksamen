import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { About, Home, Game } from './pages'

import Header from './components/shared/Header'


function App() {

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>Api</Route>
          <Route path="/game" element={<Game/>}>Game</Route>
          <Route path="/about" element={<About/>}>About</Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
