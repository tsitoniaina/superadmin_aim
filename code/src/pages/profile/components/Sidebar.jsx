import React from 'react';
import {Button} from 'reactstrap';
import { Nav, Button } from 'react-bootstrap';
import '../assets/css/Navbar.css';
import { Link } from 'react-router-dom';
function Sidebar() {
    const { user } = useAuth();
  
    const url_axiom = import.meta.env.VITE_APP_URL_AXIOM;
  
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
