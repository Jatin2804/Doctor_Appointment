const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  workingHours: {
    start: { type: String, required: true }, 
    end: { type: String, required: true },   
  },
  specialization: { type: String },
  image: { type: String, default: "" } // Store image URL
});

module.exports = mongoose.model("Doctor", doctorSchema);
