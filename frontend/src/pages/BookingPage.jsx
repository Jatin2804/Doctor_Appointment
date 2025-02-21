import React, { useState, useContext, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AppointmentForm from "../components/AppointmentForm";
import Confirmation from "../components/Confirmation";
import { AppointmentContext } from "../AppointmentContext";

function BookingPage() {
  const { doctor, selectedSlot, selectedDate } = useContext(AppointmentContext);
  const [step, setStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState({});
  const navigate = useNavigate();



  const handleFormSubmit = (data) => {
    setAppointmentData(data);
    setStep(2);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto", textAlign: "center" }}>
      {doctor && (
        <Box sx={{ mb: 3, p: 2, bgcolor: "white", borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h5" gutterBottom>
            {doctor.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {doctor.specialization}
          </Typography>
          <Typography variant="subtitle1">
            Appointment Date: {selectedDate}
          </Typography>
          <Typography variant="subtitle1">
            Time Slot: {selectedSlot? selectedSlot :" Not Selected"}
          </Typography>
        </Box>
      )}

      
    
      {!doctor?.name || !selectedDate || !selectedSlot ? (
        <Button variant="contained" color="primary" onClick={() => navigate("/")}>
          Select Doctor & Slot
        </Button>
      ) : 
      (<>
      {step === 1 && (
        <AppointmentForm onSubmit={handleFormSubmit} disabled={!doctor?.name || !selectedDate || !selectedSlot} />
      )}
      {step === 2 && <Confirmation appointmentData={appointmentData} />}
      </>)
      }
    </Box>
  );
}

export default BookingPage;
