import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import api from "./api";
import { ACCESS_TOKEN, GOOGLE_ACCESS_TOKEN, REFRESH_TOKEN } from "../token";


export const userAuthentication = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const auth = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN)

            console.log('Access_token', token);
            console.log('Google_access_token', googleAccessToken);

            if (token) {
                const decoded = jwtDecode(token);
                const tokenExpiration = decoded.exp;
                const now = Date.now() /1000;
                
                if (tokenExpiration < now) {
                    await refreshToken();
                } else {
                    setIsAuthorized(true);
                }
            } else if (googleAccessToken) {
                const isGoogleTokenValid = await validateGoogleToken(googleAccessToken)
                console.log("google token", isGoogleTokenValid);
                if (isGoogleTokenValid) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } else {
                setIsAuthorized(false);
            }
        }
        auth().catch(() => setIsAuthorized(false));
    }, []);


    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post('/auth/token/refresh/', {
                refresh: refreshToken,
            })
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (err) {
            console.error('Error refreshing token', err);
            setIsAuthorized(false);
        }
    };

    const validateGoogleToken = async (googleAccessToken) => {
        try {
            const res = await api.post('/auth/google/validate_token/', {
                access_token: googleAccessToken,
            });

            
            console.log("Validate response: ", res.data);
            return res.data.valid;
        } catch (err) {
            console.error('Error validating Google token', err);
            localStorage.removeItem(GOOGLE_ACCESS_TOKEN); //clearing invalid token
            return false;
        }
    }

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(GOOGLE_ACCESS_TOKEN);
        setIsAuthorized(false);
        window.location.reload();
    }

    return {isAuthorized, logout}
}