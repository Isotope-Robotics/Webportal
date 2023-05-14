import React from 'react'
import './Home.css';
import logo from "./react-logo.png";
import Navigation from './Navigation';

function Home() {
  return (<>
    <Navigation/>
      <div className="container">
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
      </div></>
  )
}

export default Home