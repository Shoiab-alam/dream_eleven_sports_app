import React from 'react'
import Matchs from './Matches/Matchs'
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import MatchDetails from './Matches/MatchDetails';
import Signup from './Login/Signup';
import Login from './Login/Login';
import Navbar from './Navbar';
import Team from './Matches/Team';

const App = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Matchs />}/>
          <Route path='/matches/:id' element={<MatchDetails />}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path='/team/:id' element={<Team />}/>
        </Routes>
    </Router>
  )
}

export default App