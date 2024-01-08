import React, { useState, useEffect, Component } from 'react'
import axios from 'axios';
import './Match.css';

function Match() {
  const [events, setEvents] = useState([{ 'name': '', 'event_code': '' }])
  const [selectEvent, setSelectedEvent] = useState('');
  const [values, setValues] = useState({
    teamNumber: "",
    matchNum: "",
    placement: "",
    mobility: "",
    autoAmpNote: "",
    autoSpeakerNote: "",
    ampNote: "",
    speakerNote: "",
    ampedSpeakerNote: "",
    park: "",
    onStage: "",
    spotlit: "",
    harmony: "",
    trapNote: "",
    winLossTie: "",
    cards: ""
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
              <label for="autoAmpNote"><strong>Auto Amp Note:</strong></label>
              {" "}
              <select name="autoAmpNote" id="autoAmpNote" onChange={(e) => setValues({ ...values, autoAmpNote: e.target.value })}>
                <option id="No" name="No" value="No">No</option>
                <option id="Yes" name="Yes" value="Yes">Yes</option>
              </select>
            </div>
            <div className='mb-3'>
              <label for="autoSpeakerNote"><strong>Auto Cone High:</strong></label>
              {" "}
              <select name="autoSpeakerNote" id="autoSpeakerNote" onChange={(e) => setValues({ ...values, autoSpeakerNote: e.target.value })}>
                <option id="0" name="0" value="0">0</option>
                <option id="1" name="1" value="1">1</option>
                <option id="2" name="2" value="2">2</option>
                <option id="3" name="3" value="3">3</option>
                <option id="4" name="4" value="4">4</option>
                <option id="5" name="5" value="4">5</option>
                <option id="6" name="6" value="4">6</option>
                <option id="7" name="7" value="4">7</option>
                <option id="8" name="8" value="4">8</option>
                <option id="9" name="9" value="4">9</option>
                <option id="10" name="10" value="4">10</option>
              </select>
            </div>

            <div className='mb-3'>
              <label for="ampNote"><strong>Teleop Amp Notes:</strong></label>
              {" "}
              <select name="ampNote" id="ampNote" onChange={(e) => setValues({ ...values, ampNote: e.target.value })}>
                <option id="0" name="0" value="0">0</option>
                <option id="1" name="1" value="1">1</option>
                <option id="2" name="2" value="2">2</option>
                <option id="3" name="3" value="3">3</option>
                <option id="4" name="4" value="4">4</option>
                <option id="5" name="5" value="4">5</option>
                <option id="6" name="6" value="4">6</option>
                <option id="7" name="7" value="4">7</option>
                <option id="8" name="8" value="4">8</option>
                <option id="9" name="9" value="4">9</option>
                <option id="10" name="10" value="4">10</option>
              </select>
            </div>
            <div className='mb-3'>
              <label for="speakerNote"><strong>Teleop Speaker Notes:</strong></label>
              {" "}
              <select name="speakerNote" id="speakerNote" onChange={(e) => setValues({ ...values, speakerNote: e.target.value })}>
                <option id="0" name="0" value="0">0</option>
                <option id="1" name="1" value="1">1</option>
                <option id="2" name="2" value="2">2</option>
                <option id="3" name="3" value="3">3</option>
                <option id="4" name="4" value="4">4</option>
                <option id="5" name="5" value="4">5</option>
                <option id="6" name="6" value="4">6</option>
                <option id="7" name="7" value="4">7</option>
                <option id="8" name="8" value="4">8</option>
                <option id="9" name="9" value="4">9</option>
                <option id="10" name="10" value="4">10</option>
              </select>
            </div>

            <div className='mb-3'>
              <label for="ampedSpeakerNote"><strong>Teleop Amped Notes:</strong></label>
              {" "}
              <select name="ampedSpeakerNote" id="ampedSpeakerNote" onChange={(e) => setValues({ ...values, ampedSpeakerNote: e.target.value })}>
                <option id="0" name="0" value="0">0</option>
                <option id="1" name="1" value="1">1</option>
                <option id="2" name="2" value="2">2</option>
                <option id="3" name="3" value="3">3</option>
                <option id="4" name="4" value="4">4</option>
                <option id="5" name="5" value="4">5</option>
                <option id="6" name="6" value="4">6</option>
                <option id="7" name="7" value="4">7</option>
                <option id="8" name="8" value="4">8</option>
                <option id="9" name="9" value="4">9</option>
                <option id="10" name="10" value="4">10</option>
              </select>
            </div>

            <div className='mb-3'>
              <label for="park"><strong>Endgame Park:</strong></label>
              {" "}
              <select name="park" id="park" onChange={(e) => setValues({ ...values, park: e.target.value })}>
                <option id="No" name="No" value="No">No</option>
                <option id="Yes" name="Yes" value="Yes">Yes</option>
              </select>
            </div>
            <div className='mb-3'>
              <label for="onStage"><strong>Endgame Onstage:</strong></label>
              {" "}
              <select name="onStage" id="onStage" onChange={(e) => setValues({ ...values, onStage: e.target.value })}>
                <option id="No" name="No" value="No">No</option>
                <option id="Yes" name="Yes" value="Yes">Yes</option>
              </select>
            </div>
            <div className='mb-3'>
              <label for="spotlit"><strong>Endgame Spotlit:</strong></label>
              {" "}
              <select name="spotlit" id="spotlit" onChange={(e) => setValues({ ...values, spotlit: e.target.value })}>
                <option id="No" name="No" value="No">No</option>
                <option id="Yes" name="Yes" value="Yes">Yes</option>
              </select>
            </div>
            <div className='mb-3'>
              <label for="harmony"><strong>Endgame harmony:</strong></label>
              {" "}
              <select name="harmony" id="harmony" onChange={(e) => setValues({ ...values, harmony: e.target.value })}>
                <option id="No" name="No" value="No">No</option>
                <option id="Yes" name="Yes" value="Yes">Yes</option>
              </select>
            </div>
            <div className='mb-3'>
              <label for="trapNote"><strong>Endgame Trap Note:</strong></label>
              {" "}
              <select name="trapNote" id="trapNote" onChange={(e) => setValues({ ...values, trapNote: e.target.value })}>
                <option id="No" name="No" value="No">No</option>
                <option id="Yes" name="Yes" value="Yes">Yes</option>
              </select>
            </div>
            <div className='mb-3'>
              <label for="winLossTie"><strong>Win/Loss/Tie:</strong></label>
              {" "}
              <select name="winLossTie" id="winLossTie" onChange={(e) => setValues({ ...values, winLossTie: e.target.value })}>
                <option id="Won" name="Won" value="Won">Won</option>
                <option id="Lost" name="Lost" value="Lost">Lost</option>
                <option id="Tie" name="Tie" value="Tie">Tie</option>
              </select>
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