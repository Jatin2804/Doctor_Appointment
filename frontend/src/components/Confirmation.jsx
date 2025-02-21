// src/components/Confirmation.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function Confirmation({ appointmentData }) {
  const handleConfirm = () => {
    // handle final confirmation
    alert('Appointment confirmed!');
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Confirm Your Appointment
      </Typography>
      <Typography>Name: {appointmentData.name}</Typography>
      <Typography>Email: {appointmentData.email}</Typography>
      <Typography>Phone: {appointmentData.phone}</Typography>
      <Typography>Reason: {appointmentData.reason}</Typography>

      <Button variant="contained" onClick={handleConfirm} sx={{ mt: 2 }}>
        Confirm
      </Button>
    </Box>
  );
}

export default Confirmation;
