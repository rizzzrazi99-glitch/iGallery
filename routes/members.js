const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Ensure the user images directory exists
const uploadDir = 'public/user-images/';
if (!fs.existsSync(uploadDir)) {
    try {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log('Created directory:', uploadDir);
    } catch (err) {
        console.error('CRITICAL: Could not create user images directory:', err.message);
    }
}

// Configure Cloudinary Storage
const { storage } = require('../lib/cloudinary');
const upload = multer({ storage: storage });

// GET registration page
router.get('/register', (req, res) => {
    res.render('register');
});

// POST register a new member
router.post('/register', (req, res) => {
    // Log the incoming request body before Multer processes the file
    console.log('[REGISTRATION] Received request body:', req.body);

    upload.single('image')(req, res, async function (err) {
        let imagePath = req.body.imageUrl || null;

        if (err) {
            console.error('[REGISTRATION] Cloudinary Upload Error:', err);
            const errorMessage = err.message || JSON.stringify(err) || 'Unknown Error';
            return res.status(500).send(`Upload Error: ${errorMessage}`);
        }

        if (req.file) {
            imagePath = req.file.path; // Cloudinary returns the full URL in .path
            console.log('[REGISTRATION] Image uploaded to Cloudinary:', imagePath);
        }

        try {
            const { name, username, email, age, profession, place, bio } = req.body;
            console.log('[REGISTRATION] Attempting to save new member:', { username, email });

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

            const savedMember = await newMember.save();
            console.log('[REGISTRATION] Success! Member saved with ID:', savedMember._id);
            res.redirect('/members/contributors');
        } catch (dbErr) {
            console.error('[REGISTRATION] Database Save Error:', dbErr);

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
