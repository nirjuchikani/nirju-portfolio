const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connect to the database using the secret URI from the .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        process.exit(1); // Stop the server if the database fails to connect
    }
};

module.exports = connectDB;