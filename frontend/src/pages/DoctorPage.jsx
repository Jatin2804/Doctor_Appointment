// src/pages/DoctorPage.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Grid, Avatar, CircularProgress, TextField } from '@mui/material';
import SlotSelection from '../components/SlotSelection';
import axios from 'axios';
import { AppointmentContext } from '../AppointmentContext';
import { useNavigate } from 'react-router-dom';

function DoctorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {doctor, setDoctor} = useContext(AppointmentContext);
  const {selectedSlot, setSelectedSlot} = useContext(AppointmentContext);
  const {selectedDate, setSelectedDate} = useContext(AppointmentContext);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/doctors/${id}/slots?date=${selectedDate}`);
        setDoctor(response.data.doctor);
        setSlots(response.data.slots);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [id, selectedDate]); // Fetch data when id or date changes

  const handleBookAppointment = () => {

    console.log('Booking appointment for:', doctor.name);
    navigate(`/booking`);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Avatar 
              src={doctor.image} 
              alt={doctor.name} 
              sx={{ width: 120, height: 120, bgcolor: 'white', boxShadow: 3 }} 
            />
          </Box>
          
          <Typography variant="h5" gutterBottom>
            {doctor.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {doctor.specialization}
          </Typography>

         
          <TextField
            label="Select Date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            inputProps={{ min: getTodayDate() }} // Prevent selecting past dates
            sx={{ m: 2 }}
            InputLabelProps={{ shrink: true }}
          />

          <SlotSelection slots={slots} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot}/>

          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleBookAppointment}>
              Book Appointment
            </Button>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default DoctorPage;
