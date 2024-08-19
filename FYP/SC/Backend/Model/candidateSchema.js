const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  file: {
    filename: String,
    path: String
  },
   name: {
    type: String,
    required: [true, 'Candidate name is required'],
    trim: true,
  },
  party: {
    type: String,
    required: [true, 'Party affiliation is required'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [18, 'Age must be at least 18'],
    max: [120, 'Age must be below 120'],
  },
  qualification: {
    type: String,
    required: [true, 'Qualification is required'],
    trim: true,
  },
  details: {
    type: String,
    required: [true, 'Details are required'],
    trim: true,
  },
  votes: {
    type: Number,
    default: 0,
    min: [0, 'Votes cannot be negative'],
  },
  hasRegistered: { type: Boolean, default: false },
  status: {
    type: String,
    enum: {
      values: ['pending', 'approved', 'rejected'],
      message: 'Status must be either: pending, approved, or rejected',
    },
    default: 'pending',
  },
}, {
  timestamps: true,
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
