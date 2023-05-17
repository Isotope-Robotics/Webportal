import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Home.css';
import logo from "./react-logo.png";

function Home() {

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');


  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8081')
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
        <h1>Welcome to the Convergence Web Scouting Portal</h1>
      </div>

      <div className="Info">
        <p>To start scouting click on Pit Scouting or Match Scouting but login before you do so.
          <br />
          To view scouting results and team lists visit the results page.</p>
      </div>

      <div className="react-logo-container" >
        <p>Built With</p>
        <img src={logo} alt='React-Logo' width={'1300%'} height={'auto'} className='image-react' />
      </div>
    </div>
  )
}

export default Home