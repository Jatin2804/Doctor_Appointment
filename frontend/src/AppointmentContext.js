import React, { createContext, useState } from 'react';

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
   const getTodayDate = () => {
      const today = new Date();
      return today.toISOString().split('T')[0];
    };
  
    const [selectedDate, setSelectedDate] = useState(getTodayDate());

  return (
    <AppointmentContext.Provider value={{ doctor, setDoctor ,selectedSlot, setSelectedSlot,selectedDate, setSelectedDate}}>
      {children}
    </AppointmentContext.Provider>
  );
};
