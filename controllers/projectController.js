const Project = require('../models/Project');
const getProjects = async (req, res) => {
    try {
       
        const projects = await Project.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        
        console.error("MongoDB Fetch Error:", error); 

        res.status(500).json({
            success: false,
            error: 'Server error while fetching project data.',
            details: error.message 
        });
    }
};

module.exports = {
    getProjects
};