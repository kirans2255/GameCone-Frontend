// import React from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
// import { Typography, Box } from '@mui/material';
import { FaPhoneAlt } from 'react-icons/fa';
import  Signup  from '../../services/user/signup';
import GoogleSignIn from './google';


const SignupForm = () => {

  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex">

      {/* Left side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-black text-white p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-left text-5xl font-bold">Get Started Now</h2>
          </div>
          <Formik
            initialValues={{ name: '', email: '', phoneNumber: '' , password: '', terms: false }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email is required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              if (!values.password) {
                errors.password = 'Password is required';
              }
              if (!values.phoneNumber) {
                errors.phoneNumber = 'Mobile Number is required';
              }
              if (!values.name) {
                errors.name = 'Name is required';
              }
              if (!values.terms) {
                errors.terms = 'You must agree to the terms and policy';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                const response = await Signup(values)
                console.log("Respons :", response);

                if (response && response.token) {
                  localStorage.setItem('token', response.token);

                  navigate('/login')
                }
              } catch (error) {
                setErrors({
                  email: error.message.includes('User already exists') ? 'User already exists' : '',
                })
              }
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 bg-black text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 bg-black text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="Enter your Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 bg-black text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className="text-red-500 text-sm mt-1">{errors.phoneNumber}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 bg-black text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-white">
                    I agree to the terms & policy
                  </label>
                </div>
                {errors.terms && touched.terms && (
                  <div className="text-red-500 text-sm mt-1">{errors.terms}</div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Sign up
                  </button>
                </div>

                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-500">OR</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button
                    type="button"
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
                  > 
                    <GoogleSignIn />
                    {/* <FaGoogle className="mr-2 h-5 w-5" /> */}
                  </button> 
                  <button
                    type="button"
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
                  >
                    <FaPhoneAlt className="mr-2 h-5 w-5" />
                    Sign in with OTP
                  </button>
                </div>

                <div className="text-sm text-center text-white">
                  Have an account?{' '}
                  <a href="/login" className="font-medium text-green-500 hover:text-green-700">
                    Log In
                  </a>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/cartoon-man-wearing-vr-glasses_23-2151136835.jpg)' }}>
      </div>
    </div>
  )
};

export default SignupForm;
