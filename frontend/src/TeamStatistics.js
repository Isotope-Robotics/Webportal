import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './TeamStatistics.css'

function TeamStatistics() {

  const [info, setInfo] = useState([]);
  const [gotInfo, setGotInfo] = useState(false);
  const [name, setName] = useState('');
  const [auth, setAuth] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectEvent, setSelectedEvent] = useState('');
  const [selectedTeam, setSelectedTeam] = useState([]);


  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('/api/token', {
      withCredentials: true
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

  //Populates state varibles with possible CHS events
  useEffect(() => {
    axios.get('/api/find/events/all')
      .then((res) => setEvents(res.data.results));
  }, []);


  //Handles the select event selection
  const handleChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  const handleChangeTeams = (e) => {
    setSelectedTeam(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }

  return (
    <div className='container'>
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

      <div className='selectEvent' onSubmit={handleSubmit}>
        <h1>Team Stats</h1>
        <form className='selectForm'>
          <label className='label-selectEvent' htmlFor='select-event'><strong>Select Event: </strong></label>
          <select className='select-event' onChange={handleChange}>
            <option value=''>Select Event</option>
            {events.map((event, index) => {
              return (
                <option value={event.name}>{event.name}</option>
              )
            })}
          </select>
          {" "}
          <label className='label-selectTeam' htmlFor='select-team'><strong>Select Team: </strong></label>
          <select className='select-team' onChange={handleChange}>
            <option value=''>Select Team</option>
            {events.map((event, index) => {
              return (
                <option value={event.name}>{event.name}</option>
              )
            })}
          </select>
          {" "}
          <button type='submit' className='btn btn-success w-20 rounded-2 custom-btn'>Select</button>
        </form>
        <br />
      </div>
    </div>
  )
}

export default TeamStatistics