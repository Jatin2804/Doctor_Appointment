const Appointment = require("../models/Appointment");
const { addMinutes, isWithinInterval, parse, format } = require("date-fns");


exports.calculateAvailableSlots = async (doctor, date) => {
  const { workingHours } = doctor;
  const startTime = parse(workingHours.start, "HH:mm", new Date(date));
  const endTime = parse(workingHours.end, "HH:mm", new Date(date));

  
  const appointments = await Appointment.find({
    doctorId: doctor._id,
    date: { $gte: startTime, $lt: endTime },
  });

  const slots = [];
  let currentTime = startTime;

  while (currentTime < endTime) {
    const slotEnd = addMinutes(currentTime, 30);
    const isSlotAvailable = !appointments.some((appointment) => {
      const appointmentEnd = addMinutes(appointment.date, appointment.duration);
      return (
        isWithinInterval(currentTime, { start: appointment.date, end: appointmentEnd }) ||
        isWithinInterval(slotEnd, { start: appointment.date, end: appointmentEnd })
      );
    });

    if (isSlotAvailable) {
      slots.push(format(currentTime, "HH:mm"));
    }

    currentTime = slotEnd;
  }

  return {doctor,slots};
};