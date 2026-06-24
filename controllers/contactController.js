const Message = require('../models/Message');


const submitMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Simple validation check
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'Please fill in all required fields' });
        }

       
        const newMessage = await Message.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            message: 'Your message has been delivered successfully!',
            data: newMessage
        });
    }  catch (error) {
       
        console.error("MongoDB Message Save Error:", error); 

        res.status(500).json({
            success: false,
            error: 'Server error while sending message. Please try again.',
            details: error.message 
        });
    }
};

module.exports = {
    submitMessage
};