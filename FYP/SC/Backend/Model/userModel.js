const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique:true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String
  },
  fingerprint: {
    type: String
  },
  hasVoted: {
    type: Boolean,
    default: false
  },
  cnicNumber: {
    type: String,
    unique: true, 
    sparse: true 
  },
  address: {
    type: String
  },
  accountType: {
    type: String,
    enum: ['candidate', 'voter', 'admin'], 
    default: 'voter',
  }, registrationType: {
    type: String,
    enum: ['voter', 'candidate'],
  },
  hasRegistered: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
});

// Create the User Model
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
