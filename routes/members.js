const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists (Only in development or environments with write access)
const uploadDir = 'public/uploads/';
if (process.env.NODE_ENV !== 'production') {
    if (!fs.existsSync(uploadDir)) {
        try {
            fs.mkdirSync(uploadDir, { recursive: true });
        } catch (err) {
            console.error('Warning: Could not create upload directory:', err.message);
        }
    }
}

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// GET registration page
router.get('/register', (req, res) => {
    res.render('register');
});

// POST register a new member
router.post('/register', upload.single('image'), async (req, res) => {
    try {
        const { name, username, email, age, profession, place, bio } = req.body;
        const image = req.file ? '/uploads/' + req.file.filename : null;

        const newMember = new Member({
            name,
            username,
            email,
            image,
            age,
            profession,
            place,
            bio
        });
        await newMember.save();
        res.redirect('/members/contributors');
    } catch (err) {
        console.error('Registration Error:', err);

        // Handle Vercel / Read-only filesystem error
        if (err.code === 'EROFS' || err.message.includes('read-only')) {
            return res.status(500).send('Server Error: This platform does not support local file uploads. Please use a cloud storage provider or contact the administrator.');
        }

        if (err.name === 'ValidationError') {
            return res.status(400).send('Validation Error: ' + err.message);
        }
        if (err.code === 11000) {
            return res.status(400).send('Error: Username or Email already exists.');
        }
        res.status(500).send('Internal Server Error while registering: ' + err.message);
    }
});

// GET contributors page
router.get('/contributors', async (req, res) => {
    try {
        const contributors = await Member.find().sort({ joinedAt: -1 });
        res.render('contributors', { contributors });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
