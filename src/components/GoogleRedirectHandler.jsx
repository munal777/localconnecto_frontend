// import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { GOOGLE_ACCESS_TOKEN } from "../token";


// export default function RedirectGoogleAuth() {
//     const navigate = useNavigate();
    
//     useEffect(() => {
//         console.log("RedirectHandler mounted successfully.");

//         const queryParams = new URLSearchParams(window.location.search);
//         const accessToken = queryParams.get('access_token');
//         console.log("QueryParams: ", window.location.search);

//         if (accessToken) {
//             console.log("AccessToken found: ", accessToken);
//             localStorage.setItem(GOOGLE_ACCESS_TOKEN, accessToken);


//             axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//             axios.get('http://127.0.0.1:8000/auth/users/')
//             .then(response => {
//                 console.log('User data', response.data);
//                 navigate('/')
//             })
//             .catch(err => {
//                 console.error('Error verfiying token:', err.response ? err.response.data : err.response.message);
//                 navigate('/login');
//             });
//         } else {
//             console.log('No token found in URL');
//             navigate('/login');
//         }
//     }, [navigate])

//     return <div>logging in .....</div>
// }

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../token";

export default function RedirectGoogleAuth() {
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("RedirectHandler mounted successfully.");

        const queryParams = new URLSearchParams(window.location.search);
        const accessToken = queryParams.get('access_token');
        const refreshToken = queryParams.get('refresh_token');
        const error = queryParams.get('error');
        
        console.log("QueryParams:", window.location.search);

        if (error) {
            console.error("Authentication error:", error);
            toast.error(`Google login failed: ${error}`);
            navigate('/login');
            return;
        }

        if (accessToken) {
            console.log("JWT AccessToken found!");
            
            // Store the JWT tokens
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            if (refreshToken) {
                localStorage.setItem(REFRESH_TOKEN, refreshToken);
            }
            
            toast.success("Successfully signed in with Google");
            
            // Navigate to home page
            setTimeout(() => {
                navigate('/');
                window.location.reload(); // Reload to update authentication state
            }, 1000);
        } else {
            console.log('No token found in URL');
            toast.error("No authentication token received");
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Logging in with Google...</h2>
                <p>Please wait while we authenticate your account.</p>
            </div>
        </div>
    );
}