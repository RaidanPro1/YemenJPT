const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Middleware to ensure user is Root Admin
const ensureRoot = (req, res, next) => {
    // Logic: check req.user.role === 'root_admin'
    next();
};

router.use(ensureRoot);

// Dashboard Overview
router.get('/', adminController.getDashboard);

// Branding (God Mode)
router.get('/branding', adminController.getBranding);
router.post('/branding', upload.single('logo'), adminController.updateBranding);

// Tenant Management
router.get('/tenants', adminController.getTenants);
router.post('/tenants', adminController.createTenant);

// AI Command Center
router.get('/ai', adminController.getAiNexus);
router.post('/ai/feedback/:id/:action', adminController.moderateAiFeedback);

// Security & Social Auth
router.get('/security', adminController.getSecurity);
router.post('/security/oauth', adminController.updateOauth);

module.exports = router;