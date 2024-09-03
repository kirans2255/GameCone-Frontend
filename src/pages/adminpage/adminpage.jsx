// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import {Login} from '../../services/admin/login';

const  Adminloginpage = () => {

  const navigate = useNavigate();

  return(
  <Box
    className="flex items-center justify-center min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(https://storage.googleapis.com/pod_public/1300/168838.jpg)` }}
  >
    <Box className="w-full max-w-sm p-10 bg-gray-900 bg-opacity-60 rounded-lg shadow-lg">
      <Typography
        variant="h3"
        className="text-center text-white text-3xl mb-8 font-bold"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        LOGIN
      </Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting,setErrors }) => {
          try {
            const response = await Login(values);
            console.log('Response:', response);  // This should now log the actual response data
            
            if(response && response.token){
              localStorage.setItem('token',response.token)

              navigate('/admin/dashboard')
            }
          } catch (error) {
            console.error('Login error:', error);  
            setErrors({
              email: error.message.includes('Admin Not Found') ? 'Admin Not Found' : '',
              password: error.message.includes('Invalid Password') ? 'Invalid Password' : ''
            });
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.email}
                </div>
              )}
            </div>
            <div> 
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                disabled={isSubmitting}
              >
                LOGIN
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Box>
  </Box>
  )
};

export default Adminloginpage;
