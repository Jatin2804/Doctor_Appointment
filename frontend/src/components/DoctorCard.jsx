import React from 'react';
import { Card, CardContent, CardActions, Avatar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  const handleCheckSlots = () => {
    navigate(`/doctor/${doctor._id}`);
  };

  return (
    <Card sx={{ minWidth: 250, boxShadow: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Avatar 
          src={doctor.image} 
          alt={doctor.name} 
          sx={{ width: 80, height: 80,backgroundColor:"white" }} 
        />
      </Box>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6">{doctor.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {doctor.specialization}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" size="small" sx={{marginBottom:"10px"}} onClick={handleCheckSlots}>
          Check Slots
        </Button>
      </CardActions>
    </Card>
  );
}

export default DoctorCard;