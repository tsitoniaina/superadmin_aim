import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import Config from '../../config';

const project_id = Config.project_id;
const project_key = Config.project_key;
const urlBack = 'https://jose-axiom-api.dt5.natixgroup.com';

const supabase = createClient(`https://${project_id}.supabase.co`, project_key);

const ApiMatrix = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error) {
                console.error('Erreur lors de la récupération de la session:', error);
                return;
            }

            if (session) {
                setToken(session.access_token);
                localStorage.setItem('token_axiom', session.access_token);
                console.log("Token récupéré :", session.access_token);
            }
        };

        fetchToken();
    }, []);

    const getToken = () => {
        return `Bearer ${token}`;
    };

    const getUserData = useCallback(async () => { 
        if (!token) {
            throw new Error("Token is not available.");
        }

        try {
            const response = await axios.get(`${urlBack}/get-user/${token}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getToken(),
                }
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Erreur du serveur:', error.response.data);
            }
            throw error; 
        }
    }, [token]); 

    const updateUserData = async (userData) => {
        if (!token) {
            throw new Error("Token is not available.");
        }

        try {
            const response = await axios.post(`${urlBack}/update-user`, {
                token: token,
                user_data: userData,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getToken(),
                }
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Erreur du serveur lors de la mise à jour:', error.response.data);
            }
            throw error; 
        }
    };

    return { getUserData, updateUserData };
};

export default ApiMatrix;
