const express = require('express');
const router = express.Router();
const { getProjects } = require('../controllers/projectController');


// Route for getting portfolio projects
router.get('/projects', getProjects);



module.exports = router;
