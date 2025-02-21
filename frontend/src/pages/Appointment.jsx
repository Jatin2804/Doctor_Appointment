import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
} from "@mui/material";

const API_BASE_URL = "https://doctor-appointment-owms.onrender.com/appointments";

const AppointmentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAppointment(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointment details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!appointment) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Appointment not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        {/* Title Section */}
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
          Appointment Details
        </Typography>

        <Grid container spacing={4}>
          {/* Doctor Details */}
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 3, p: 2, textAlign: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img
                  src={appointment.doctorId.image}
                  alt={appointment.doctorId.name}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: 10,
                  }}
                />
                <Typography variant="h6">{appointment.doctorId.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {appointment.doctorId.specialization}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Working Hours: {appointment.doctorId.workingHours.start} -{" "}
                  {appointment.doctorId.workingHours.end}
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Appointment Details */}
          <Grid item xs={12} md={8}>
            <Card sx={{ boxShadow: 3, borderRadius: 3, p: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Appointment Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Patient:</strong> {appointment.patientName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Appointment Type:</strong> {appointment.appointmentType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Date:</strong> {new Date(appointment.date).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Duration:</strong> {appointment.duration} minutes
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Notes:</strong> {appointment.notes || "No notes provided"}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
            Back
          </Button>
          
        </Box>
      </Paper>
    </Container>
  );
};

export default AppointmentDetailPage;
