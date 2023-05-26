import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function Navigation() {

    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('/api/token', {
            withCredentials: true
        })
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                } else {
                    setAuth(false);
                }
            })
            .then(err => console.error(err))
    })

    const navigate = useNavigate();
    const handleDelete = () => {
        axios.get('/api/auth/logout', {
            withCredentials: true
        })
            .then(res => {
                navigate("/");
            }).catch(err => console.log(err));
    }

    return (
        <Navbar className='bg-custom' variant='dark' expand="sm" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">Convergence Robotics</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        {
                            auth ?
                                <>
                                    <NavDropdown title="Scouting" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/Pit">Pit</NavDropdown.Item>
                                        <NavDropdown.Item href="/Match">Match</NavDropdown.Item>
                                    </NavDropdown>

                                    <NavDropdown title="Results" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/team_list">Team Info</NavDropdown.Item>
                                        <NavDropdown.Item href="/pit_scouting_list">Pit Info</NavDropdown.Item>
                                        <NavDropdown.Item href="/match_scouting_list">Match Info</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="/LogHours">Log Hours</Nav.Link>
                                    <Nav.Link href="/admin">Admin</Nav.Link>
                                    <button className='btn btn-danger outline-danger' onClick={handleDelete}>Logout</button>
                                </>
                                :
                                <>
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href='/About'>About</Nav.Link>
                                    <NavDropdown title="FIRST" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/FLL">FLL</NavDropdown.Item>
                                        <NavDropdown.Item href="/FTC">FTC</NavDropdown.Item>
                                        <NavDropdown.Item href="/FRC">FRC</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href='/Login'>Login</Nav.Link>
                                </>

                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation