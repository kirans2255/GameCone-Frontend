/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleAuthButton = ({ onSuccess, onFailure }) => (
  <div className="w-full flex items-center justify-center cursor-pointer">
  <GoogleLogin
    onSuccess={onSuccess}
    onFailure={onFailure}
  />
  </div>
);

export default GoogleAuthButton; 