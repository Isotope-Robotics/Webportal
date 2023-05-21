import React, { useState, useEffect, Component } from 'react'
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Footer from './Footer';

function Match() {

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [eventList, setEventList] = useState([]);


  //Pulls events from API and Populates Them In Event State
  
    const getEvents = async () => {
      axios.get('/api/find/events', {
        params: {
          year: "2023"
        }
      })
        .then(res => {
          if (res.data.Status === "Success") {
            setEventList(res.data.data);

          } else {
            alert("Cannot Get Events From Server");
          }
        })
        .then(err => console.error(err));
    };


  return (

    <>
      <div className='title'>
        <h1>Match Scouting</h1>
      </div>

    
      <div className='selectEvent'>
      <button className='btn btn-success' onClick={getEvents}>Click</button>

      
        {
          eventList.map((list) => {
          <select>
            <option>{list.name}</option>
            <option>Hello</option>
          </select>
          })
        }
      

      </div>

      <Footer />
    </>

  )
}


export default Match