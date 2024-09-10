/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Formik } from 'formik';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../../services/user/login';
import GoogleSignIn from './google';

const LoginForm = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* Left side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-black text-white p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-left text-5xl font-bold">Welcome Back!</h2>
            <h2 className="mt-6 text-left text-1xl font-bold">Enter your credentials to access your Account</h2>
          </div>
          <Formik
            initialValues={{ email: '', password: '', terms: false }}
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
              if (!values.terms) {
                errors.terms = 'You must agree to the terms and policy';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                const response = await Login(values);
                console.log("Response :", response);

                if (response && response.token) {
                  localStorage.setItem('token', response.token);
                  navigate('/home');
                }
              } catch (error) {
                if (error.message.includes('User is Blocked')) {
                  toast.error('Your account has been blocked. ');
                } else {
                  setErrors({
                    email: error.message.includes('User Not Found') ? 'User Not Found' : '',
                    password: error.message.includes('Invalid Password') ? 'Invalid Password' : ''
                  });
                }
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
                  {/* <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  /> */}
                  {/* <label htmlFor="terms" className="ml-2 block text-sm text-white">
                    I agree to the terms & policy
                  </label> */}
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
                    Login
                  </button>
                </div>

                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-500">OR</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button
                    type="button"
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
                  > <GoogleSignIn />
                  </button>
                </div>

                <div className="text-sm text-center text-white">
                  Don't have an Account?{' '}
                  <a href="/signup" className="font-medium text-green-500 hover:text-green-700">
                    Sign Up
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

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
