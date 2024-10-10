import React from 'react';
import {Button, CardBody} from 'reactstrap';
import { Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../../../code/src/assets/css/style.css";
function Sidebar() {
  return (
    <div className=''>
        <div className="d-flex justify-content-center align-items-center">
            <div
                className="col-auto px-5"
                style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                letterSpacing: '0.1rem',
                color: '#000',
                textTransform: 'uppercase',
                }}
            >
                <span style={{ color: '#4B0082' }}>A</span>XIOM
            </div>
        </div>
        <CardBody>
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/" className='menu-list'>
                    Users list
                </Nav.Link>
                <Nav.Link as={Link} to="/matrix" className='menu-list'>
                    Matrix Simulation
                </Nav.Link>
                <Nav.Link as={Link} to="/matrix-list" className='menu-list'>
                    Liste Matrix
                </Nav.Link>
            </Nav>
        </CardBody>
        <div className="sidebar">
        <div className="sidebar-footer">
            <>
                <Button variant="outline-light" className="w-100 mb-2">
                Mon profil
                </Button>
                <Button variant="primary" className="w-100" href="/signout">
                Déconnexion
                </Button>
            </>
        </div>
    </div>
    </div>
  
  );
}

export default Sidebar;