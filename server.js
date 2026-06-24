// 1. Node.js Version Compatibility Patch
if (!process.getBuiltinModule) {
    process.getBuiltinModule = require;
}

// 2. Core Dependencies
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Import the API routes file
const apiRoutes = require('./routes/apiRoutes');

// 3. Configuration
dotenv.config();
const app = express();

// Activate the database connection
connectDB(); 

// 4. Global Middleware
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// Serve static frontend files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// 5. API Endpoints (Must be loaded BEFORE the frontend HTML routes)
app.use('/api', apiRoutes); 

// 6. Frontend View Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 7. Server Startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is successfully running on http://localhost:${PORT}`);
});