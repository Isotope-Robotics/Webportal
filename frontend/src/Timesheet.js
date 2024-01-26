import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './Timesheet.css';

function Timesheet() {
    const [timesheet, setTimesheet] = useState([]);
    const [gotTimesheet, setGotTimesheet] = useState(false);
    const [name, setName] = useState('');
    const [auth, setAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState('');

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('/api/token', {
            withCredentials: true
        })
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setIsAdmin(res.data.admin);
                    setName(res.data.user);
                } else {
                    setAuth(false);
                    setIsAdmin(res.data.admin);
                    setName("No User");
                }
            })
            .then(err => console.error(err))
    })

    useEffect(() => {
        axios.get('/api/hours/getAllHours')
            .then(res => {
                if (res.data.Status === "Success") {
                    setTimesheet(res.data.results);
                    setGotTimesheet(true);
                } else {
                    setGotTimesheet(false);
                }
            })
    }, [])

    const handleBackToLogin = () => {
        navigate('/login');
    }

    return (
        <>
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
            </div>

            {isAdmin == "true" ?
                <>
                    <h1>Timesheets</h1>

                    {gotTimesheet ?

                        <>mb-3
                            <div className=''>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name:</th>
                                            <th>Date:</th>
                                            <th>Start Time:</th>
                                            <th>Finish Time:</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {timesheet.map((timesheetInfo, index) => {
                                            return (
                                                <tr>
                                                    <td>{timesheetInfo.name}</td>
                                                    <td>{timesheetInfo.date}</td>
                                                    <td>{timesheetInfo.starttime}</td>
                                                    <td>{timesheetInfo.finishtime}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>

                        :
                        <>

                        </>
                    }

                </>
                :
                <>
                    <div className='d-flex justify-content-center' style={{ color: 'red' }}>
                        <h1>Sorry You Need To Be An Admin To View This Page</h1>
                    </div>

                    <>
                        <form className='d-flex justify-content-center' onSubmit={handleBackToLogin}>
                            <button type='submit' className='btn btn-info'>Back to Login</button>
                        </form>
                    </>
                </>

            }

        </>
    )
}

export default Timesheet