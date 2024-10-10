import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

import Config from '../../config';

const project_id = Config.project_id;
const project_key = Config.project_key;

const supabase = createClient('https://' + project_id + '.supabase.co', project_key);

const SignOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const signOutUser = async () => {
            await supabase.auth.signOut(); 
            localStorage.removeItem('token_axiom');
            navigate('/'); 
        };

        signOutUser();
    }, [navigate]);
}

export default SignOut;