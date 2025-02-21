// src/components/DoctorList.js
import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import DoctorCard from './DoctorCard';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://doctor-appointment-owms.onrender.com/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '50vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (doctors.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No doctors available.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {doctors.map((doctor) => (
        <Grid item xs={12} sm={6} md={4} key={doctor.id}>
          <DoctorCard doctor={doctor} />
        </Grid>
      ))}
    </Grid>
  );
}

export default DoctorList;
