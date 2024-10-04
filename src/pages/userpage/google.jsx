import React ,{useState} from 'react';
import handleGoogleAuth from '../../services/user/signupwithgoogle'
import GoogleAuthButton from '../../components/AuthButton/Google Button';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);


    const handleSuccess = async (response) => {
        setLoading(true);
        try {
            await handleGoogleAuth(response, navigate);

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };  

    const handleFailure = (error) => {
        console.error('Google sign-in error:', error);
    };

    return (
        <GoogleAuthButton
            onSuccess={handleSuccess}
            onFailure={handleFailure}
        />
    )
};

export default GoogleSignIn;
