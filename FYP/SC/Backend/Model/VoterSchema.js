const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  file:{
    type:String,
    path:String
  },
  cnicNumber: {
    type: String,
    required: true,
    unique: true, 
    trim: true 
  },
  address: {
    type: String,
    required: true, 
    trim: true 
  },
  registrationType: {
    type: String,
    enum: ['voter', 'candidate'],
    required: true
  },
  hasRegistered: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
});

const VoterModel = mongoose.model('Voter', voterSchema);
module.exports = VoterModel;
