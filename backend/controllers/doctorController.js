const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const { calculateAvailableSlots } = require("../services/slotService");


exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctors", error: err.message });
  }
};


exports.getAvailableSlots = async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const availableSlots = await calculateAvailableSlots(doctor, date);
    res.status(200).json({doctor: availableSlots.doctor, slots: availableSlots.slots});
  } catch (err) {
    res.status(500).json({ message: "Error calculating slots", error: err.message });
  }
};