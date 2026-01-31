const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const multer = require('multer');
const path = require('path');

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
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
        console.error(err);
        res.status(500).send('Error registering member. Username or Email might already exist.');
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
