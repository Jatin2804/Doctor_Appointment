const Joi = require("joi");

const appointmentSchema = Joi.object({
  doctorId: Joi.string().trim().required().messages({
    "string.empty": "Doctor ID is required",
  }),
  date: Joi.date().iso().required().messages({
    "date.format": "Invalid date format",
  }),
  duration: Joi.number().integer().min(1).required().messages({
    "number.base": "Duration must be a positive number",
    "number.min": "Duration must be at least 1 minute",
  }),
  appointmentType: Joi.string().trim().required().messages({
    "string.empty": "Appointment type is required",
  }),
  patientName: Joi.string().trim().required().messages({
    "string.empty": "Patient name is required",
  }),
  notes: Joi.string(),
});

const validateAppointment = (req, res, next) => {
  const { error } = appointmentSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

module.exports = { validateAppointment };
