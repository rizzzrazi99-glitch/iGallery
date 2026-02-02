const express = require('express');
const router = express.Router();
const GalleryItem = require('../models/GalleryItem');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Ensure the gallery upload directory exists
const galleryUploadDir = 'public/gallery-images/';
if (!fs.existsSync(galleryUploadDir)) {
    try {
        fs.mkdirSync(galleryUploadDir, { recursive: true });
    } catch (err) {
        console.error('Gallery directory creation error:', err.message);
    }
}

// Configure Cloudinary Storage
const { storage } = require('../lib/cloudinary');
const upload = multer({ storage: storage });

// GET gallery page
router.get('/', async (req, res) => {
    try {
        const items = await GalleryItem.find().sort({ createdAt: -1 });
        res.render('gallery', { items });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST upload gallery item
router.post('/upload', (req, res) => {
    // Attempting to upload image and diagnostic logging enabled
    upload.single('image')(req, res, async function (err) {
        let imagePath = req.body.imageUrl || null;

        if (err) {
            console.error('Gallery Cloudinary Upload Error:', err);
            const errorMessage = err.message || JSON.stringify(err) || 'Unknown Error';
            return res.status(500).send(`Upload Error: ${errorMessage}`);
        }

        try {
            const { title, description } = req.body;

            // If multer succeeded and we have a file, use the Cloudinary URL
            if (req.file) {
                imagePath = req.file.path;
            }

            if (!imagePath) {
                return res.status(400).send('Please upload an image file or provide an Image URL');
            }

            const newItem = new GalleryItem({
                title,
                description,
                image: imagePath
            });

            await newItem.save();
            res.redirect('/admin/gallery');
        } catch (dbErr) {
            console.error('Gallery Save Error:', dbErr);
            res.status(500).send('Error saving gallery item: ' + dbErr.message);
        }
    });
});

module.exports = router;
