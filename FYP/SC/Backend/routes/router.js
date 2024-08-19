// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
router.post('/admin-register', adminController.registerAdmin);
router.post('/admin-login', adminController.loginAdmin);
router.get('/admin-dashboard',adminController.getCount);
module.exports = router;
