import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Pit.css';
import Footer from './Footer';

function Pit() {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/event/pit/submit' , values, {headers: {event_code: selectEvent}})
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
    <div className=' justify-content-center bg-custom align-items-center vh-100 form-custom'>
      <div className='bg-white p-3 rounded signin-custom'>
        <h2>Pit Scouting:</h2>
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

        <form className='pitForm' id='pitForm' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='teamNumber'><strong>Team Number:</strong></label>
            <input type='text' placeholder='Enter Team Number' name='teamNumber' className='form-control rounded-0' onChange={(e) => setValues({ ...values,  number: e.target.value })} ></input>
          </div>
      
          <div className='mb-3'>
            <label htmlFor='robotWeight'><strong>Robot Weight:</strong></label>
            <input type='text' placeholder='Enter Robot Weight' name='robotWeight' className='form-control rounded-0' onChange={(e) => setValues({ ...values,  weight: e.target.value })}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='robotHeight'><strong>Robot Height:</strong></label>
            <input type='text' placeholder='Enter Robot Height' name='robotHeight' className='form-control rounded-0' onChange={(e) => setValues({ ...values,  height: e.target.value })}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='robotLength'><strong>Robot Length:</strong></label>
            <input type='text' placeholder='Enter Robot Length' name='robotLength' className='form-control rounded-0' onChange={(e) => setValues({ ...values,  length: e.target.value })}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='robotWidth'><strong>Robot Width:</strong></label>
            <input type='text' placeholder='Enter Robot Width' name='robotWidth' className='form-control rounded-0' onChange={(e) => setValues({ ...values,  width: e.target.value })}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='robotWidth'><strong>Robot Drivetrain: Fix Me</strong></label>
            <input type='text' placeholder='Enter Robot Drivetrain' name='robotWidth' className='form-control rounded-0' onChange={(e) => setValues({ ...values,  driveTrain: e.target.value })}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='robotWidth'><strong>Robot Motors: Fix Me</strong></label>
            <input type='text' placeholder='Enter Robot Motors' name='robotWidth' className='form-control rounded-0' onChange={(e) => setValues({ ...values,  motors: e.target.value })}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='robotWidth'><strong>Robot Freespeed:</strong></label>
            <input type='text' placeholder='Enter Robot Freespeed ft/sec' name='robotWidth' className='form-control rounded-0' onChange={(e) => setValues({ ...values,  freeSpeed: e.target.value })}></input>
          </div>


          <div className='mb-3'>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Save</button>
          </div>


        </form>
      </div>
    </div>
  )
}

export default Pit