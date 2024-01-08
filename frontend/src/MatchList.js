import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import './MatchList.css';

function MatchList() {

    const [info, setInfo] = useState([]);
    const [gotInfo, setGotInfo] = useState(false);
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
        axios.post('/api/event/scouting/match', selectEvent, { headers: { event_code: selectEvent } })
            .then(res => {
                if (res.data.Status === "Success") {
                    setInfo(res.data.data);
                    setGotInfo(true);
                } else {
                    setGotInfo(false);
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
                <h1>Match Scouting Results</h1>
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

            <div className='tableContainer'>
                {gotInfo ? <>
                    <h3>Info From: {selectEvent}</h3>
                    <Alert variant={'success'}>Please Note: You may have to swipe side to side to see the full table or flip your screen</Alert>
                    <div style={{ overflowX: "auto" }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Team Number</th>
                                    <th>Match Number</th>
                                    <th>Auto Placement</th>
                                    <th>Auto Mobility</th>
                                    <th>Auto Amp</th>
                                    <th>Auto Speaker</th>
                                    <th>Amp Notes</th>
                                    <th>Speaker Notes</th>
                                    <th>Amped Notes</th>
                                    <th>Parked</th>
                                    <th>OnStage</th>
                                    <th>Spotlit</th>
                                    <th>Harmony</th>
                                    <th>Trap</th>
                                    <th>Win/Loss/Tie</th>
                                </tr>
                            </thead>
                            <tbody>
                                {info.map((matchInfo, index) => {
                                    return (
                                        <tr>
                                            <td>{matchInfo.TeamNumber}</td>
                                            <td>{matchInfo.MatchNum}</td>
                                            <td>{matchInfo.Placement}</td>
                                            <td>{matchInfo.Mobility}</td>
                                            <td>{matchInfo.AutoAmpNote}</td>
                                            <td>{matchInfo.AutoSpeakerNote}</td>
                                            <td>{matchInfo.AmpNote}</td>
                                            <td>{matchInfo.SpeakerNote}</td>
                                            <td>{matchInfo.AmpedSpeakerNote}</td>
                                            <td>{matchInfo.Park}</td>
                                            <td>{matchInfo.OnStage}</td>
                                            <td>{matchInfo.Spotlit}</td>
                                            <td>{matchInfo.Harmony}</td>
                                            <td>{matchInfo.TrapNote}</td>
                                            <td>{matchInfo.WinLossTie}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </>

                    :
                    <p>No Selected Event or No Data Present</p>
                }
            </div>

        </div>
    )
}

export default MatchList