import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './PitList.css';

function PitList() {
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
        axios.post('/api/event/scouting/pit', selectEvent, { headers: { event_code: selectEvent } })
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
                <br />
            </div>

            <div className='tables'>
                {gotInfo ? <>
                    <h2>Info From: {selectEvent}</h2>
                    <p>Please Note: You may have to swipe side to side to see the full table or flip your screen.</p>
                    <Table striped bordered hover size="sm" responsive="sm">
                        <thead>
                            <tr>
                                <th>Team:</th>
                                <th>Weight:</th>
                                <th>Height:</th>
                                <th>Length:</th>
                                <th>Width:</th>
                                <th>Drivetrain:</th>
                                <th>DT Motors:</th>
                                <th>Free Speed:</th>
                                <th>Pickup:</th>
                                <th>Scoring:</th>
                                <th>Hang:</th>
                                <th>Start Position:</th>
                                <th>Balance:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {info.map((pitInfo, index) => {
                                return (
                                    <tr>
                                        <td>{pitInfo.Number}</td>
                                        <td>{pitInfo.Weight}</td>
                                        <td>{pitInfo.Height}</td>
                                        <td>{pitInfo.Length}</td>
                                        <td>{pitInfo.Width}</td>
                                        <td>{pitInfo.Drivetrain}</td>
                                        <td>{pitInfo.Drivetrain_Motors}</td>
                                        <td>{pitInfo.FreeSpeed}</td>
                                        <td>{pitInfo.Element_Pickup}</td>
                                        <td>{pitInfo.Element_Scoring}</td>
                                        <td>{pitInfo.Hang_Charge}</td>
                                        <td>{pitInfo.Start_Position}</td>
                                        <td>{pitInfo.Auto_Balance}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </>

                    :
                    <p>No Selected Event</p>
                }
            </div>


        </div>
    )
}

export default PitList