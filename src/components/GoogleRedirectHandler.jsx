import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GOOGLE_ACCESS_TOKEN } from "../token";


export default function RedirectGoogleAuth() {
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("RedirectHandler mounted successfully.");

        const queryParams = new URLSearchParams(window.location.search);
        const accessToken = queryParams.get('access_token');
        console.log("QueryParams: ", window.location.search);

        if (accessToken) {
            console.log("AccessToken found: ", accessToken);
            localStorage.setItem(GOOGLE_ACCESS_TOKEN, accessToken);


            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            axios.get('http://127.0.0.1:8000/auth/user/')
            .then(response => {
                console.log('User data', response.data);
                navigate('/')
            })
            .catch(err => {
                console.error('Error verfiying token:', err.response ? err.response.data : err.response.message);
                navigate('/login');
            });
        } else {
            console.log('No token found in URL');
            navigate('/login');
        }
    }, [navigate])

    return <div>logging in .....</div>
}