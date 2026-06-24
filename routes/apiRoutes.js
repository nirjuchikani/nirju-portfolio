const express = require('express');
const router = express.Router();
const { getProjects } = require('../controllers/projectController');
const { submitMessage } = require('../controllers/contactController');

// Route for getting portfolio projects
router.get('/projects', getProjects);

// Route for sending a new contact message
router.post('/contact', submitMessage);

module.exports = router;