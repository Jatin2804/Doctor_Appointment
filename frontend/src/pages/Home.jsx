// src/pages/Home.js
import React from 'react';
import DoctorList from '../components/DoctorList';
import { Typography, Box } from '@mui/material';

function Home() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{textAlign:"center",color:"#1976d2"}}>
        Our Doctors
      </Typography>
      <DoctorList />
    </Box>
  );
}

export default Home;
