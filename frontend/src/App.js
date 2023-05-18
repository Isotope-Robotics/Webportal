import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Register';
import Home from './Home';
import Login from './Login';
import Navigation from './Navigation';
import TeamList from './TeamList';
import PitList from './PitList';
import MatchList from './MatchList';

function App() {
  return (
   <BrowserRouter>
   <Navigation/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/team_list' element={<TeamList/>}></Route>
      <Route path='/pit_scouting_list' element={<PitList/>}></Route>
      <Route path='/match_scouting_list' element={<MatchList/>}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
