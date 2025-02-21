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
       Booked Appointment
      </Typography>
      

      <Button variant="contained" onClick={handleConfirm} sx={{ mt: 2 }}>
        Confirm
      </Button>
    </Box>
  );
}

export default Confirmation;
