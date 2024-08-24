const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectdb = require('./db/connection');
const UserModel = require('./Model/userModel');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'ali@321';
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const OtpModel = require('./Model/otpMode');
const adminRouting = require('./routes/router');
const CandidateModel = require('./Model/candidateSchema');
const VoterModel=require('./Model/VoterSchema');
const Admin = require('./Model/AdminModel');
const path=require('path');
connectdb();
const app = express();
const multer=require('multer');
const storage=multer.diskStorage({
  destination:function(req,file,cb){
      cb(null, './public/Images');
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
cb(null,file.fieldname+'_'+uniqueSuffix + path.extname(file.originalname));
    }
})
const upload=multer({storage:storage})
app.use(express.static('public'));
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST","PUT","DELETE"],
  credentials: true
}));
app.use('/Images', express.static(path.join(__dirname, 'public/Images')));
app.use(cookieParser());
app.use('/admin',adminRouting);
const generateOtp = () => crypto.randomInt(100000, 999999).toString();
const sendOtp = async (email) => {
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  try {
    await OtpModel.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `Your App ${process.env.EMAIL_USER}`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It expires in 15 minutes.`
    });

    console.log('OTP sent:', info.response);
  } catch (err) {
    console.error('Error sending OTP:', err.message);
    throw new Error('Error sending OTP');
  }
};
app.use(express.static(path.join(__dirname, '..', 'frontend', 'e-voting', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'e-voting', 'dist', 'index.html'));
});

app.post('/verify-otp', async (req, res) => {
  const { otp } = req.body;

  try {
    const otpEntry = await OtpModel.findOne({ otp });

    if (!otpEntry) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (otpEntry.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Expired OTP' });
    }
    await OtpModel.deleteOne({ otp });
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error.message);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const payload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '100000000h' });
    res.cookie('token', token, { httpOnly: true});
    res.json({ token, userId: user._id, email});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.delete('/users',(req,res)=>{
  const delteUser=UserModel.deleteMany({});
  res.status(200).json("All user are delted");
}
)
app.post('/signup', async (req, res) => {
   const { userName, email, password, confirmPassword } = req.body;

  try {
   
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(409).json({ message: "This is an admin email. You cannot use it." });
    }


    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ userName, email, password: hashedPassword });
    await newUser.save();
    //It will send otp to that email
    await sendOtp(email);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err.message);
    if (err.code === 11000) {
      res.status(409).json({ message: 'Email already in use' });
    } else {
      res.status(500).json({ error: 'Error creating user' });
    }
  }
});
  
app.post('/voting-registration', upload.single('file'), async (req, res) => {
  const { email, name, party, age, qualification, details, cnicNumber, address, registrationType } = req.body;
  const file = req.file;
  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.hasRegistered) {
      return res.status(400).json({ message: 'User has already registered' });
    }

    if (registrationType === 'candidate') {
      if (!name || !party || !age || !qualification || !details) {
        return res.status(400).json({ message: 'All candidate fields are required' });
      }
      if (isNaN(age) || age < 18) {
        return res.status(400).json({ message: 'Age must be a number and at least 18' });
      }

      // Create and save candidate
      const candidate = new CandidateModel({
        name,
        party,
        age,
        qualification,
        details,
        hasRegistered: true,
        registrationType,
        file: { filename: file.filename, path: file.path },
        status:'pending'
      });
      await candidate.save();
    } else if (registrationType === 'voter') {
      if (!cnicNumber || !address) {
        return res.status(400).json({ message: 'CNIC number and address are required for voters' });
      }
      const voter = new VoterModel({
        cnicNumber,
        address,
        hasRegistered: true,
        registrationType
      });
      await voter.save();
    } else {
      return res.status(400).json({ message: 'Invalid registration type' });
    }

    user.hasRegistered = true;
    user.registrationType = registrationType;
    await user.save();

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
app.get('/voting-registration/:email', async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await UserModel.findOne({ email }); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hasRegistered = user.hasRegistered;
    const accountType = user.accountType; //  user.registrationType if needed
    res.json({ hasRegistered, accountType }); // Return status and type
  } catch (err) {
    console.error('Failed to fetch user status', err); 
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/candidates', async (req, res) => {
  try {
    const candidates = await CandidateModel.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch candidates' });
  }
});
app.delete('/candidates/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await CandidateModel.findByIdAndDelete(id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    console.error('Error deleting candidate:', error.message);
    res.status(500).json({ message: 'Failed to delete candidate' });
  }
});
app.post('/candidates/approve/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await CandidateModel.findById(id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    if (candidate.status === 'approved') {
      return res.status(400).json({ message: 'Candidate is already approved' });
    }
    candidate.status = 'approved';
    await candidate.save();
    res.status(200).json({ message: 'Candidate approved successfully', candidate });
  } catch (error) {
    console.error('Error approving candidate:', error.message);
    res.status(500).json({ message: 'Failed to approve candidate' });
  }
});
app.post('/candidates/reject/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await CandidateModel.findById(id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    if (candidate.status !== 'pending') {
      return res.status(400).json({ message: 'Candidate status cannot be changed' });
    }
    candidate.status = 'rejected';
    await candidate.save();
    res.status(200).json({ message: 'Candidate rejected successfully', candidate });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject candidate' });
  }
});
app.delete('/admin-dashboard/candidates/delete/:id',async(req,res)=>{
  const {id}=req.params;
  try {
  const deleteCandidate=await CandidateModel.findByIdAndDelete(id);
      if(!deleteCandidate){
    res.status(400).json("Cannot find candidate");
  }
  res.status(200).json("Successfully deleted Candidate");
  } catch (error) {
    res.status(500).json({message:"Failed to delete candidate"});
  }
})
app.get('/candidates/approved', async (req, res) => {
  try {
    const candidates = await CandidateModel.find({status:'approved'});
    res.status(200).json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching candidates' });
  }
});
app.get('/candidates/pending', async (req, res) => {
  try {
    const candidates = await CandidateModel.find({status:'pending'});
    res.status(200).json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching candidates' });
  }
});
app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/vote', async (req, res) => {
  const { candidateId, userId } = req.body;
  console.log('Received data:', { candidateId, userId });
  if (!candidateId || !userId) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.hasVoted) {
      return res.status(400).json({ message: 'You have already voted' });
    }
    const candidate = await CandidateModel.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    await CandidateModel.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } });
    await UserModel.findByIdAndUpdate(userId, { hasVoted: true });
    res.status(200).json({ message: 'Vote recorded successfully' });
  } catch (error) {
    console.error('Error occurred:', error); // Log the error
    res.status(500).json({ message: 'Failed to record vote' });
  }
});

app.get('/result', async (req, res) => {
  try {
    const candidates = await CandidateModel.find({status:'approved'});
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch results' });
  }
});
app.get('/user', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});