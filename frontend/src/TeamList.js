import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import './TeamList.css';

function TeamList() {

    const [teams, setTeams] = useState([]);
    const [gotTeam, setGotTeam] = useState(false);
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
                setTeams(res.data.results);
                setGotTeam(true);
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
                <h1>Team List</h1>
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
                    <button type='submit' className='btn btn-success w-20 rounded-2 custom-btn'>Select</button>
                </form>
                <br />
            </div>

            <div>
                {gotTeam ?
                    <>
                        <h2>Teams From: {selectEvent}</h2>
                        <div className='mb-3'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Team Number:</th>
                                        <th>Team Name:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teams.map((importedTeams, index) => {
                                        return (
                                            <tr>
                                                <td>{importedTeams.teamNumber}</td>
                                                <td>{importedTeams.nickname}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                    :
                    <>
                        <p>No Selected Event or No Data Present</p>
                    </>
                }
            </div>
        </div>
    )
}

export default TeamList