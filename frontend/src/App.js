import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Register';
import Login from './Login';
import Navigation from './Navigation';
import Pit from './Pit';
import Match from './Match';
import TeamList from './TeamList';
import PitList from './PitList';
import MatchList from './MatchList';
import ScoutingHome from './ScoutingHome';
import LogHours from './LogHours';
import Admin from './Admin';
import RegisterEvent from './RegisterEvent';
import EditUsers from './EditUsers';
import EditEvent from './EditEvent';

function App() {
  return (
   <BrowserRouter>
   <Navigation/>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/admin' element={<Admin/>}></Route>
      <Route path='/new_event' element={<RegisterEvent/>}></Route>
      <Route path='/editevent' element={<EditEvent/>}></Route>
      <Route path="/LogHours" element={<LogHours/>}></Route>
      <Route path='/team_list' element={<TeamList/>}></Route>
      <Route path='/pit_scouting_list' element={<PitList/>}></Route>
      <Route path='/match_scouting_list' element={<MatchList/>}></Route>
      <Route path='/pit' element={<Pit/>}></Route>
      <Route path='/match' element={<Match/>}></Route>
      <Route path='/edit_user' element={<EditUsers/>}></Route>
      <Route path='/ScoutingHome' element={<ScoutingHome/>}></Route>
    </Routes>
   </BrowserRouter>

  );
}

export default App;
