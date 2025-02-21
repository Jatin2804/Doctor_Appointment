import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import DoctorPage from './pages/DoctorPage';
import AppointmentsPage from './pages/AppointmentsPage';
import { AppointmentProvider } from './AppointmentContext';

import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import BookingPage from './pages/BookingPage';
import Appointment from './pages/Appointment';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, cursor: 'pointer' }} 
          onClick={() => navigate('/')} // Navigate to Home
        >
          Appointment Booking
        </Typography>
        {location.pathname !== "/appointments" && ( // Hide button on Appointments page
          <Button 
            variant="contained" 
            sx={{ color: "#1976d2", backgroundColor: "white" }} 
            onClick={() => navigate('/appointments')} // Corrected typo
          >
            Appointments
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    < AppointmentProvider>
      <Router>
        <Navbar /> {/* Navbar inside Router to prevent useNavigate error */}
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctor/:id" element={<DoctorPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/booking" element={<BookingPage/>} /> 
            <Route path="/appointment/:id" element={<Appointment />} />

          </Routes>
        </Container>
      </Router>
    </ AppointmentProvider>
  );
}

export default App;
