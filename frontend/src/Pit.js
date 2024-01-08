import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Pit.css';

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
    start_Position: '',
    element_Pickup: '',
    element_Scoring: '',
    onStage: '',
    trap: ''
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
    axios.post('/api/event/pit/submit', values, { headers: { event_code: selectEvent } })
      .then(res => {
        if (res.data.Status === "Success") {
          const pit_form = document.getElementById("pitForm");
          pit_form.addEventListener('submit', (e) => {
          e.preventDefault();
          pit_form.reset();
          })
        } else {
          alert("Error Submitting Values to API");
          window.location.reload(false);
        }
      })
  }

  return (
    <div className='justify-content-center bg-custom align-items-center vh-100 form-custom'>
      <div className='bg-white p-3 rounded signin-custom'>
        <h2>Pit Scouting:</h2>
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

        <form className='pitForm' id='pitForm' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='teamNumber'><strong>Team Number:</strong></label>
            <input type='text' placeholder='Enter Team Number' name='teamNumber' className='form-control rounded-0' onChange={(e) => setValues({ ...values, number: e.target.value })} ></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='robotWeight'><strong>Robot Weight:</strong></label>
            <input type='text' placeholder='Enter Robot Weight' name='robotWeight' className='form-control rounded-0' onChange={(e) => setValues({ ...values, weight: e.target.value })}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='robotHeight'><strong>Robot Height:</strong></label>
            <input type='text' placeholder='Enter Robot Height' name='robotHeight' className='form-control rounded-0' onChange={(e) => setValues({ ...values, height: e.target.value })}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='robotLength'><strong>Robot Length:</strong></label>
            <input type='text' placeholder='Enter Robot Length' name='robotLength' className='form-control rounded-0' onChange={(e) => setValues({ ...values, length: e.target.value })}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='robotWidth'><strong>Robot Width:</strong></label>
            <input type='text' placeholder='Enter Robot Width' name='robotWidth' className='form-control rounded-0' onChange={(e) => setValues({ ...values, width: e.target.value })}></input>
          </div>

          <div className='mb-3'>
            <label for="robotDrivetrain"><strong>Robot Drivetrain:</strong></label>
            {" "}
            <select name="robotDrivetrain" id="robotDrivetrain" onChange={(e) => setValues({ ...values, driveTrain: e.target.value })}>
              <option id="unknown" name="unknown" value="unknown">Unknown</option>
              <option id="Swerve" name="Swerve" value="Swerve">Swerve</option>
              <option id="Mecanum" name="Mecanum" value="Mecanum">Mecanum</option>
              <option id="Skid Steer" name="Skid Steer" value="Skid Steer">Skid Steer</option>
            </select>
          </div>

          <div className='mb-3'>
            <label for="robotDrivetrainMotors"><strong>Drivetrain Motors:</strong></label>
            {" "}
            <select name="robotDrivetrainMotors" id="robotDrivetrainMotors" onChange={(e) => setValues({ ...values, motors: e.target.value })}>
              <option id="unknown" name="unknown" value="unknown">Unknown</option>
              <option id="Neo" name="Neo" value="Neo">Neo</option>
              <option id="Falcon 500" name="Falcon 500" value="Falcon 500">Falcon 500</option>
              <option id="CIM" name="CIM" value="CIM">CIM</option>
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor='robotWidth'><strong>Robot Freespeed:</strong></label>
            <input type='text' placeholder='Enter Robot Freespeed ft/sec' name='robotWidth' className='form-control rounded-0' onChange={(e) => setValues({ ...values, freeSpeed: e.target.value })}></input>
          </div>

          <div className='mb-3'>
            <label for="autoStartPosition"> <strong>Auto Start Position:</strong></label>
            <select name="autoStartPosition" id="autoStartPosition" onChange={(e) => setValues({ ...values, start_Position: e.target.value })}>
              <option id="unknown" name="unknown" value="unknown">Unknown</option>
              <option id="Left" name="Left" value="Left">Left</option>
              <option id="Center" name="Center" value="Center">Center</option>
              <option id="Right" name="Right" value="Right">Right</option>
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor='element_Pickup'><strong>Note Pickup Method:</strong></label>
            <input type='text' placeholder='Enter Note Pickup Method' name='element_Pickup' className='form-control rounded-0' onChange={(e) => setValues({ ...values, element_Pickup: e.target.value })}></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='element_Scoring'><strong>Note Scoring Method:</strong></label>
            <input type='text' placeholder='Enter Note Scoring Method' name='element_Scoring' className='form-control rounded-0' onChange={(e) => setValues({ ...values, element_Scoring: e.target.value })}></input>
          </div>
      
          <div className='mb-3'>
            <label for="onStage"><strong>OnStage (Climb):</strong></label>
            <select name="onStage" id="onStage" onChange={(e) => setValues({ ...values, onStage: e.target.value })}>
              <option id="unknown" name="unknown" value="unknown">Unknown</option>
              <option id="No" name="No" value="No">No</option>
              <option id="Yes" name="Yes" value="Yes">Yes</option>
            </select>
          </div>

          <div className='mb-3'>
            <label for="trap"><strong>Trap Score:</strong></label>
            <select name="trap" id="trap" onChange={(e) => setValues({ ...values, trap: e.target.value })}>
              <option id="unknown" name="unknown" value="unknown">Unknown</option>
              <option id="No" name="No" value="No">No</option>
              <option id="Yes" name="Yes" value="Yes">Yes</option>
            </select>
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