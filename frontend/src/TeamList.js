import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import './TeamList.css';

function TeamList() {

    const [teams, setTeams] = useState([{ 'number': '', 'nickname': '' }]);
    const [name, setName] = useState('');
    const [auth, setAuth] = useState(false);
    const [events, setEvents] = useState([]);
    const [selectEvent, setSelectedEvent] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/event/teams', selectEvent, { headers: { event_code: selectEvent } })
            .then(res => {
                if (res.data.Status === "Success") {
                    setTeams(res.data.results);
                } else {
                    <alert>Can't Get Team for {selectEvent}</alert>
                }
            })
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
                <form className='selectForm'>
                    <label className='label-selectEvent' htmlFor='select-event'><strong>Select Event: </strong></label>
                    <select className='select-event' onChange={handleChange}>
                        <option value='Select Event'>Select Event</option>
                        {events.map((event, index) => {
                            return (
                                <option value={event.name}>{event.name}</option>
                            )
                        })}
                    </select>
                    {" "}
                    <button type='submit' className='btn btn-success w-20 rounded-2'>Select</button>
                </form>
            </div>

            <>
                <br />
                
            </>
        </div>
    )
}

export default TeamList