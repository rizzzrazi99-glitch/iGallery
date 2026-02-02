const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the user images directory exists
const uploadDir = 'public/user-images/';
if (!fs.existsSync(uploadDir)) {
    try {
        fs.mkdirSync(uploadDir, { recursive: true });
    } catch (err) {
        console.error('Warning: Could not create user images directory:', err.message);
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
router.post('/register', (req, res) => {
    upload.single('image')(req, res, async function (err) {
        // If Multer fails due to read-only filesystem, we can still proceed with text data
        let imagePath = null;
        if (err) {
            console.error('Multer Error (likely EROFS on Vercel):', err.message);
            // If the error isn't about the filesystem, we might want to return it
            if (err.code !== 'EROFS' && !err.message.includes('read-only')) {
                return res.status(500).send('Upload Error: ' + err.message);
            }
            // If it IS EROFS, we just log it and proceed without an image
        } else {
            imagePath = req.file ? '/user-images/' + req.file.filename : null;
        }

        try {
            const { name, username, email, age, profession, place, bio } = req.body;

            const newMember = new Member({
                name,
                username,
                email,
                image: imagePath,
                age,
                profession,
                place,
                bio
            });

            await newMember.save();
            res.redirect('/members/contributors');
        } catch (dbErr) {
            console.error('Registration Error:', dbErr);

            if (dbErr.name === 'ValidationError') {
                return res.status(400).send('Validation Error: ' + dbErr.message);
            }
            if (dbErr.code === 11000) {
                return res.status(400).send('Error: Username or Email already exists.');
            }
            res.status(500).send('Internal Server Error while registering: ' + dbErr.message);
        }
    });
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
