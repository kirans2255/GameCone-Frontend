import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {
    const navigate = useNavigate();

    const handleSuccess = async (response) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const { data } = await axios.get('http://localhost:5173/auth/google', {
                headers: {
                    Authorization: `Bearer ${response.credential}`
                },
                withCredentials: true,
            });
            navigate('/dashboard'); // Redirect to dashboard or a protected route
        } catch (error) {
            console.error('Error during Google sign-in:', error);
        }
    };

    const handleError = (error) => {
        console.error('Google sign-in error:', error);
    };

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div>
                {/* <h2>Sign in with Google</h2> */}
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                    useOneTap
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleSignIn;
