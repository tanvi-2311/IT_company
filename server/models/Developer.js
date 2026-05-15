const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  talentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  verified: { type: Boolean, default: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  partTime: { type: Boolean, default: false },
  fullTime: { type: Boolean, default: false },
  years: { type: Number, required: true },
  skillHeading: { type: String, required: true },
  bio: { type: String, required: true },
  skills: [{ type: String }],
  experience: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Developer', developerSchema);
