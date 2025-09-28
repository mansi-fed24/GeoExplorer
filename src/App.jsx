import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import Countries from './pages/Countries'
import CountryDetails from './pages/CountryDetails'
import Quiz from './pages/Quiz'
import Leaderboard from './pages/Leaderboard'
import Collection from './pages/Collection'
import Navbar from './components/Navbar'

const App = () => {
  return (
    
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/countries' element={<Countries />} />
          <Route path='/countries/:countryName' element={<CountryDetails />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/collection' element={<Collection />} />
        </Routes>

      </BrowserRouter>
    
    
  )
}

export default App
