import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Register';
import Home from './Home';
import Login from './Login';
import Navigation from './Navigation';

function App() {
  return (
   <BrowserRouter>
   <Navigation/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
