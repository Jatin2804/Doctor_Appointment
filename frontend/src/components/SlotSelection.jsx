import React from 'react';
import { Grid, Button, Typography } from '@mui/material';

function SlotSelection({ slots, selectedSlot, setSelectedSlot }) {
  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    console.log('Selected slot:', slot);
  };

  return (
    <Grid container spacing={2} sx={{ marginX: "auto", textAlign: "center" }}>
      {/* Ensure title is properly aligned */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
          Available Slots
        </Typography>
      </Grid>

      {slots.map((slot) => (
        <Grid item key={slot}>
          <Button
            variant={selectedSlot === slot ? "contained" : "outlined"}
            onClick={() => handleSlotClick(slot)}
            sx={{
              bgcolor: selectedSlot === slot ? "#1976D2" : "transparent",
              color: selectedSlot === slot ? "white" : "black",
              borderColor: "#1976D2",
              '&:hover': {
                bgcolor: selectedSlot === slot ? "#115293" : "lightgray",
              },
            }}
          >
            {slot}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

export default SlotSelection;
