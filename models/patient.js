const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },

  phone: { type: String, required: true },
  area: { type: String, required: true },
  bloodgroup: { type: String, required: true }, 
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Patient', patientSchema);
