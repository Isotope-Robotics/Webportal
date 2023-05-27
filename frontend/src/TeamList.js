import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './TeamList.css';

function TeamList() {

    const [teams, setTeams] = useState('');
    const [name, setName] = useState('');
    const [auth, setAuth] = useState(false);
    const [events, setEvents] = useState([{ 'name': '', 'event_code': '' }])
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


            <div className='selectEvent'>
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

            <>
            <br/>
                {selectEvent != '' ?

                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Team Number</th>
                                <th>Nickname</th>
                            </tr>
                        </thead>
                        <tbody>
                           <tr>
                            <td>1080</td>
                            <td>Resurgence Robotics</td>
                           </tr>
                        </tbody>
                    </Table>
                    :
                    <p>no stuff</p>
                }
            </>
        </div>
    )
}

export default TeamList