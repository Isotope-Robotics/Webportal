import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Home.css';
import logo from "./react-logo.png";
import Footer from './Footer';

function Home() {

  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');


  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('/api/token', {
      withCredentials: true,
      headers: {
        'Authorization' : localStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.user);
        } else {
          setAuth(false);
          setName("Not Signed In")
        }
      })
      .then(err => console.error(err))
  })

  return (
    <div className="container">

      <div className="d-flex justify-content-end">
        {
          auth ?
            <div className='user'>
              <p>Signed In As: {name}</p> 
            </div>
           
            :
            <div className='user'>
              <p></p>
            </div>
        }
      </div>

      <div className="Welcome">
        <h1>Welcome to the Convergence Web Site</h1>
      </div>

      <div className="Info">
        <p>This Page is Currently Under Construction</p>
      </div>

      <div className="react-logo-container" >
        <p>Built With</p>
        <img src={logo} alt='React-Logo' width={'1300%'} height={'auto'} className='image-react' />
      </div>

      <Footer/>
    </div>
  )
}

export default Home