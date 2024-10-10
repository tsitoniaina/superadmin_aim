import React from 'react';
import { useNavigate, useLocation,useParams } from 'react-router-dom';

const ComingSoon = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // const planetName = searchParams.get('planet') || 'Cette planète';
  const { planet } = useParams();


  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>{planet} n'est pas encore disponible !</h1>
        <p style={styles.text}>Cette planète est en cours de développement et sera bientôt disponible.</p>
        <a href="/dashboard" class="btn btn-primary">Retour</a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  content: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '48px',
    fontFamily: 'Orbitron, Arial, sans-serif',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    marginBottom: '30px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default ComingSoon;
