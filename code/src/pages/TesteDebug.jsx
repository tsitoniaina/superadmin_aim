import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import Config from '../../config';
import UserDataView from '../components/user-data-view';

import cardImage from '../assets/cardImage.jpg';


const project_id = Config.project_id;
const project_key = Config.project_key;
const project_type = Config.project_type;

const supabase = createClient('https://' + project_id + '.supabase.co', project_key);

export default function App() {
  const [session, setSession] = useState(null);
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    // Fetch user data when session is available
    if (session) {
      const fetchData = async () => {
        const access_token = session.access_token;
        const email = session.user.email;

        const url = `https://jose-axiom-api.dt5.natixgroup.com/user/${project_type}/${email}/${access_token}`;
        console.log(url);
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setUserData(data); // Update user data state
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [session]); // Run effect whenever session changes

  if (!session) {

    return (
      <div className="index-container login-container d-flex justify-content-center align-items-center vh-100">
        <div className="card flex-row" style={{ width: '70rem' }}>
          <img
            src={cardImage}
            alt="Image"
            className="img-fluid"
            style={{ width: '50%', borderRadius: '8px 0 0 8px' }}
          />
          <div className="card-body">
            <h2 className="text-center">Connexion</h2>
              <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
          </div>
        </div>
      </div>

    );
  } else {
    return (
      <div className="login-container d-flex justify-content-center align-items-center vh-100">
        <div className="card flex-row" style={{ width: '70rem' }}>
          <img
            src={cardImage}
            alt="Image"
            className="img-fluid"
            style={{ width: '50%', borderRadius: '8px 0 0 8px' }}
          />
          <div className="card-body">
            <h2 className="text-center">Connexion</h2>
  
            {!userData ? (
              <h1>Loading...</h1>
            ) : (
              <div>
                <h1>Logged in</h1>
                <p>Logged in as {session.user.email}</p>
                <UserDataView userData={userData} />
                <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
}
