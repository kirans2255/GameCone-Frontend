// import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

// eslint-disable-next-line react/prop-types
const LogoutModal = ({ open, handleClose, handleLogout }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
    >
      <Box
        className="bg-white p-6 rounded-md shadow-md mx-auto mt-40 max-w-sm text-center"
        style={{
          outline: 'none',
        }}
      >
        <Typography id="logout-modal-title" variant="h6" className="font-bold mb-4">
          Confirm Logout
        </Typography>
        <Typography id="logout-modal-description" className="mb-6">
          Are you sure you want to log out?
        </Typography>
        <div className="flex justify-between">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
            className="border-blue-500 text-blue-500 hover:bg-blue-100"
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
