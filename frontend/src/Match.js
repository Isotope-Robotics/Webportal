import React, { useState, useEffect, Component } from 'react'
import axios from 'axios';
import './Match.css';
import Footer from './Footer';

function Match() {
  const [events, setEvents] = useState([{ 'name': '', 'event_code': '' }])
  const [selectEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    axios.get('/api/find/events/all')
      .then((res) => setEvents(res.data.results));
  }, []);

  const handleChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  return (
    <>
      <div className='d-flex justify-content-center bg-custom align-items-center vh-100 form-custom'>
        <div className='bg-white p-3 rounded signin-custom'>
          <div className='mb-3'>
            <p>Now Scouting For Event: {selectEvent}</p>
            <label className='label-selectEvent' htmlFor='select-event'><strong>Select Event: </strong></label>
            <select className='select-event' onChange={handleChange}>
              <option value='test_event'>Test Event</option>
              {events.map((event, index) => {
                return (
                  <option value={event.event_name}>{event.name}</option>
                )
              })}
            </select>

          </div>

          <form>
            <div className='mb-3'>
              <label htmlFor='team-number'><strong>Team Number:</strong></label>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}
export default Match