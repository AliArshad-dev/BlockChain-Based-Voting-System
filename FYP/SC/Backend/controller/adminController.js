// controllers/adminController.js
const Admin = require('../Model/AdminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.Admin_SECRET || 'admin@321';
const CandidateModel=require('../Model/candidateSchema');
const VoterModel=require('../Model/VoterSchema')
exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering admin', error: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const payload = { adminId: admin._id }; 
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, adminId: admin._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
exports.getCount=async(req,res)=>{
  try {
    const totalCandidates = await CandidateModel.countDocuments();
    const totalVoters = await VoterModel.countDocuments();
    const totalVotes = await CandidateModel.aggregate([{ $group: { _id: "$_id", totalVotes: { $sum: '$votes' } } }]);
    
    res.json({
      totalCandidates,
      totalVoters,
      totalVotes: totalVotes[0] ? totalVotes[0].totalVotes : 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
}