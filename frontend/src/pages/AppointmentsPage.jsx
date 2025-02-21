import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://doctor-appointment-owms.onrender.com/appointments";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_BASE_URL)
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  useEffect(() => {
    if (editingAppointment && selectedDate) {
      fetch(
        `https://doctor-appointment-owms.onrender.com/doctors/${editingAppointment.doctorId?._id}/slots?date=${selectedDate}`
      )
        .then((res) => res.json())
        .then((data) => setAvailableSlots(data.slots))
        .catch((err) => console.error("Error fetching slots:", err));
    }
  }, [editingAppointment, selectedDate]);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      setAppointments(appointments.filter((appt) => appt._id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleUpdate = async (id) => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and slot.");
      return;
    }

    const date = new Date(selectedDate);
    const [hours, minutes] = selectedSlot.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);
    const formattedDate = date.toISOString();

    const updatedData = {
      doctorId: editingAppointment.doctorId?._id,
      date: formattedDate,
      duration: 30,
      appointmentType: editingAppointment.appointmentType,
      patientName: editingAppointment.patientName,
      notes: editingAppointment.notes,
    };

    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      setAppointments(
        appointments.map((appt) =>
          appt._id === id ? { ...appt, date: formattedDate } : appt
        )
      );
      setEditingAppointment(null);
      setSelectedDate("");
      setSelectedSlot("");
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      {appointments.map((appt) => (
        <Card key={appt._id} sx={{ mb: 2, p: 2, boxShadow: 2 }}>
          <CardContent>
            {appt.doctorId && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <img
                  src={appt.doctorId.image}
                  alt={appt.doctorId.name}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    marginRight: 10,
                  }}
                />
                <Box>
                  <Typography variant="h6">{appt.doctorId.name}</Typography>
                  <Typography variant="subtitle2">
                    {appt.doctorId.specialization}
                  </Typography>
                </Box>
              </Box>
            )}

            <Typography variant="body1">
              <strong>Patient:</strong> {appt.patientName}
            </Typography>
            <Typography variant="body2">
              <strong>Date:</strong> {new Date(appt.date).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              <strong>Type:</strong> {appt.appointmentType}
            </Typography>
            <Typography variant="body2">
              <strong>Notes:</strong> {appt.notes}
            </Typography>

            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/appointment/${appt._id}`)}
              >
                View Details
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => setEditingAppointment(appt)}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(appt._id)}
              >
                Delete
              </Button>
            </Box>

            {editingAppointment && editingAppointment._id === appt._id && (
              <Box
                sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}
              >
                <Typography variant="h6">Update Appointment</Typography>

                <TextField
                  fullWidth
                  type="date"
                  label="Change Date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  sx={{ mt: 2 }}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: new Date().toISOString().split("T")[0] }} // Restrict past dates
                />

                <TextField
                  fullWidth
                  select
                  label="Available Slots"
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  sx={{ mt: 2 }}
                >
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot, index) => (
                      <MenuItem key={index} value={slot}>
                        {slot}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No slots available</MenuItem>
                  )}
                </TextField>

                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(appt._id)}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditingAppointment(null)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AppointmentsPage;
