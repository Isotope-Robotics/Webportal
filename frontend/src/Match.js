import React, { useState, useEffect, Component } from 'react'
import axios from 'axios';
import './Match.css';
import Footer from './Footer';

function Match() {
  const [events, setEvents] = useState([{ 'name': '', 'event_code': '' }])
  const [selectEvent, setSelectedEvent] = useState('');
  const [values, setValues] = useState({
    number: '',
    weight: '',
    height: '',
    length: '',
    width: '',
    driveTrain: '',
    motors: '',
    freeSpeed: '',
    elementPickup: '',
    elementScoring: '',
    hangChargestation: '',
    startPosition: '',
    autoBalance: ''
  });

  //Populates state varibles with possible CHS events
  useEffect(() => {
    axios.get('/api/find/events/all')
      .then((res) => setEvents(res.data.results));
  }, []);

  //Handles the select event selection
  const handleChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  function findEventName(eventCode){
    return events.find((element) => {
      return element.event_code === eventCode;
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/event/match/submit' , values, {headers: {event_code: selectEvent}})
    .then(res => {
      if(res.data.Status === "Success"){
        const match_form = document.getElementById("matchForm");
        match_form.addEventListener('submit',(e) => {
          e.preventDefault();
          match_form.reset();
        })
      } else {
        alert("Error Submitting Values to API");
        window.location.reload(false);
      }
    })
  }


  return (
    <>
      <div className='d-flex justify-content-center bg-custom align-items-center vh-100 form-custom'>
        <div className='bg-white p-3 rounded signin-custom'>
          <h2>Match Scouting:</h2>
          <div className='mb-3'>
            <p>Now Scouting For Event: {selectEvent}</p>
            <label className='label-selectEvent' htmlFor='select-event'><strong>Select Event: </strong></label>
            <select className='select-event' onChange={handleChange}>
              <option value='Select Event'>Select Event</option>
              {events.map((event, index) => {
                return (
                  <option value={event.name}>{event.name}</option>
                )
              })}
            </select>

          </div>

          <form className='matchForm' id='matchForm' onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='team-number'><strong>Team Number:</strong></label>
              <input type='text' placeholder='Enter Team Number' name='team-number' className='form-control rounded-0' required='true' onChange={(e) => setValues({ ...values,  number: e.target.value })}></input>
            </div>

            <div className='submit'>
              <button type='submit' className='btn btn-success w-100 rounded-0'>Save</button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}
export default Match