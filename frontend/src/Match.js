import React, { useState, useEffect, Component } from 'react'
import axios from 'axios';
import './Match.css';

function Match() {
  const [events, setEvents] = useState([{ 'name': '', 'event_code': '' }])
  const [selectEvent, setSelectedEvent] = useState('');
  const [values, setValues] = useState({
    teamNumber: '',
    matchNumber: '',
    placement: '',
    mobility: '',
    autoBalance: '',
    coneHigh: '',
    coneLow: '',
    cubeScore: '',
    autoScore: '',
    teleConeHigh: '',
    teleConeLow: '',
    teleCube: '',
    teleScore: '',
    teleBalance: ''
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
    axios.post('/api/event/match/submit', values, { headers: { event_code: selectEvent } })
      .then(res => {
        if (res.data.Status === "Success") {
          const match_form = document.getElementById("matchForm");
          match_form.addEventListener('submit', (e) => {
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
      <div className='justify-content-center bg-custom align-items-center vh-100 form-custom'>
        <div className='bg-white p-3 rounded signin-custom'>
          <h2>Match Scouting:</h2>
          <div className='mb-3'>
            <p>Now Scouting For Event: {selectEvent}</p>
            <label className='label-selectEvent' htmlFor='select-event'><strong>Select Event: </strong></label>
            <select className='select-event' onChange={handleChange}>
              <option value=''>Select Event</option>
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
              <input type='text' placeholder='Enter Team Number' name='team-number' className='form-control rounded-0' required='true' onChange={(e) => setValues({ ...values, teamNumber: e.target.value })}></input>
            </div>
            <div className='mb-3'>
              <label htmlFor='match-number'><strong>Match Number:</strong></label>
              <input type='text' placeholder='Enter Match Number' name='match-number' className='form-control rounded-0' required='true' onChange={(e) => setValues({ ...values, matchNumber: e.target.value })}></input>
            </div>
            <div className='mb-3'>
              <label for="placement"><strong>Placement:</strong></label>
              {" "}
              <select name="placement" id="placement" onChange={(e) => setValues({ ...values, placement: e.target.value })}>
                <option id="Left" name="Left" value="Left">Left</option>
                <option id="Center" name="Center" value="Center">Center</option>
                <option id="Right" name="Right" value="Right">Right</option>
               </select>
            </div>
            <div className='mb-3'>
              <label for="mobility"><strong>Mobility:</strong></label>
              {" "}
              <select name="mobility" id="mobility" onChange={(e) => setValues({ ...values, mobility: e.target.value })}>
                <option id="No" name="No" value="No">No</option>
                <option id="Yes" name="Yes" value="Yes">Yes</option>
              </select>
            </div>
            <div className='mb-3'>
              <label for="autoBalance"><strong>Auto Balance:</strong></label>
              {" "}
              <select name="autoBalance" id="autoBalance" onChange={(e) => setValues({ ...values, autoBalance: e.target.value })}>
                <option id="No" name="No" value="No">No</option>
                <option id="Yes" name="Yes" value="Yes">Yes</option>
               </select>
            </div>
            <div className='mb-3'>
              <label for="autoConeHigh"><strong>Auto Cone High:</strong></label>
              {" "}
              <select name="autoConeHigh" id="autoConeHigh" onChange={(e) => setValues({ ...values, coneHigh: e.target.value })}>
                <option id="0" name="0" value="0">0</option>
                <option id="1" name="1" value="1">1</option>
                <option id="2" name="2" value="2">2</option>
                <option id="3" name="3" value="3">3</option>
                <option id="4" name="4" value="4">4</option>
               </select>
            </div>
            <div className='mb-3'>
              <label for="autoConeLow"><strong>Auto Cone Low:</strong></label>
              {" "}
              <select name="autoConeLow" id="autoConeLow" onChange={(e) => setValues({ ...values, coneLow: e.target.value })}>
                <option id="0" name="0" value="0">0</option>
                <option id="1" name="1" value="1">1</option>
                <option id="2" name="2" value="2">2</option>
                <option id="3" name="3" value="3">3</option>
                <option id="4" name="4" value="4">4</option>
               </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='autoCubeScore'><strong>Auto Cube Score:</strong></label>
              <input type='text' placeholder='Enter Auto Cube Score' name='autoCubeScore' className='form-control rounded-0' required='true' onChange={(e) => setValues({ ...values, cubeScore: e.target.value })}></input>
            </div>
            <div className='mb-3'>
              <label htmlFor='autoScore'><strong>Auto Score:</strong></label>
              <input type='text' placeholder='Enter Auto Score' name='autoScore' className='form-control rounded-0' required='true' onChange={(e) => setValues({ ...values, autoScore: e.target.value })}></input>
            </div>

            <div className='mb-3'>
              <label for="teleConeHigh"><strong>Auto Cone High:</strong></label>
              {" "}
              <select name="teleConeHigh" id="teleConeHigh" onChange={(e) => setValues({ ...values, teleConeHigh: e.target.value })}>
                <option id="0" name="0" value="0">0</option>
                <option id="1" name="1" value="1">1</option>
                <option id="2" name="2" value="2">2</option>
                <option id="3" name="3" value="3">3</option>
                <option id="4" name="4" value="4">4</option>
               </select>
            </div>
            <div className='mb-3'>
              <label for="teleConeLow"><strong>Tele Cone Low:</strong></label>
              {" "}
              <select name="teleConeLow" id="teleConeLow" onChange={(e) => setValues({ ...values, teleConeLow: e.target.value })}>
                <option id="0" name="0" value="0">0</option>
                <option id="1" name="1" value="1">1</option>
                <option id="2" name="2" value="2">2</option>
                <option id="3" name="3" value="3">3</option>
                <option id="4" name="4" value="4">4</option>
               </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='teleCubeScore'><strong>Tele Cube Score:</strong></label>
              <input type='text' placeholder='Enter Tele Cube Score' name='teleCubeScore' className='form-control rounded-0' required='true' onChange={(e) => setValues({ ...values, teleCube: e.target.value })}></input>
            </div>
            

            <div className='mb-3'>
              <label for="endgameBalance"><strong>Endgame Balance:</strong></label>
              {" "}
              <select name="endgameBalance" id="endgameBalance" onChange={(e) => setValues({ ...values, teleBalance: e.target.value })}>
                <option id="No" name="No" value="No">No</option>
                <option id="Yes" name="Yes" value="Yes">Yes</option>
               </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='teleScore'><strong>Tele Score:</strong></label>
              <input type='text' placeholder='Enter Tele Score' name='teleScore' className='form-control rounded-0' required='true' onChange={(e) => setValues({ ...values, teleScore: e.target.value })}></input>
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