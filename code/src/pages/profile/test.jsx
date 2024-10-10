import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Config from '../../../config'; 
const project_id = Config.project_id;
const project_key = Config.project_key;

const supabase = createClient(`https://${project_id}.supabase.co`, project_key);

const TokenFetcher = () => {
  const [token, setToken] = useState(null); 

  useEffect(() => {
    const fetchToken = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Erreur lors de la récupération de la session:', error);
      } else if (session) {
        setToken(session.access_token); 
        console.log("Token récupéré :", session.access_token);
      }
    };

    fetchToken();
  }, []); 

};

export default TokenFetcher;
