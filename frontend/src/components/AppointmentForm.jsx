import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Grid, Typography, MenuItem } from '@mui/material';
import { AppointmentContext } from '../AppointmentContext';

function AppointmentForm({ onSubmit }) {
  const { doctor, selectedDate, selectedSlot } = useContext(AppointmentContext);

  const [formData, setFormData] = useState({
    appointmentType: "",
    patientName: "",
    notes: "",
  });

//   console.log(selectedDate,selectedSlot);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const date = new Date(selectedDate);
    
    // Extract hours and minutes from selectedSlot (assuming format is "HH:mm")
    const [hours, minutes] = selectedSlot.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);
  
    // Convert to ISO format (expected format)
    const formattedDate = date.toISOString();
  
    const appointmentData = {
      doctorId: doctor?._id,
      date: formattedDate, 
      duration: 30,
      appointmentType: formData.appointmentType,
      patientName: formData.patientName,
      notes: formData.notes,
    };
  
    try {
      const response = await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });
  
      if (response.ok) {
        alert('Appointment booked successfully!');
        console.log(response);
        // onSubmit(appointmentData);
      } else {
        alert('Failed to book appointment.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };
  

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, p: 3, borderRadius: 2, boxShadow: 3, maxWidth: 500, mx: "auto", bgcolor: "white" }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Book an Appointment
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="patientName"
            variant="outlined"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </Grid>



        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Appointment Type"
            name="appointmentType"
            variant="outlined"
            value={formData.appointmentType}
            onChange={handleChange}
            required
          >
            <MenuItem value="Routine Check-Up">Routine Check-Up</MenuItem>
            <MenuItem value="Follow-up Visit">Follow-up Visit</MenuItem>
            <MenuItem value="Consultation">Consultation</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Additional Notes"
            name="notes"
            variant="outlined"
            multiline
            rows={3}
            value={formData.notes}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" type="submit" fullWidth>
            Confirm Slot
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AppointmentForm;
