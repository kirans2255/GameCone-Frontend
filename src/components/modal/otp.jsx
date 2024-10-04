/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import otplogin from '../../services/user/otp'

const OTPModal = ({ closeOTPModal }) => {
    const [phone, setPhone] = useState('');
    const [otp, setOTP] = useState('');
    const [otpSent, setOTPSent] = useState(false);

    // Function to handle sending OTP
    const handleSendOTP = async () => {
        try {
            const response = await otplogin({ phone });
            setOTPSent(true);
            toast.success('OTP sent to your phone!');
        } catch (error) {
            toast.error(error.message || 'Failed to send OTP.');
        }
    };

    // Function to handle verifying OTP
    const handleVerifyOTP = async () => {
        try {
            const response = await otplogin({ phone, otp });
            toast.success('OTP verified successfully! Logging in...');
            closeOTPModal();
        } catch (error) {
            toast.error(error.message || 'Invalid OTP.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">OTP Login</h2>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        disabled={otpSent}
                    />
                </div>
                {otpSent && (
                    <div className="mt-4">
                        <label htmlFor="otp" className="block text-sm font-medium">Enter OTP</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={e => setOTP(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                )}
                <div className="mt-6">
                    {otpSent ? (
                        <button onClick={handleVerifyOTP} className="w-full py-2 bg-green-500 text-white rounded-lg">Verify OTP</button>
                    ) : (
                        <button onClick={handleSendOTP} className="w-full py-2 bg-green-500 text-white rounded-lg">Send OTP</button>
                    )}
                </div>
                <button onClick={closeOTPModal} className="w-full mt-4 text-gray-500">Cancel</button>
            </div>
        </div>
    );
};

export default OTPModal;
