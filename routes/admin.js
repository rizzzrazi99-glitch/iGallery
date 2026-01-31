const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const GalleryItem = require('../models/GalleryItem');
const fs = require('fs');
const path = require('path');

// GET admin dashboard (Member Management)
router.get('/', async (req, res) => {
    try {
        const members = await Member.find().sort({ joinedAt: -1 });
        res.render('admin', { members });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET gallery management dashboard
router.get('/gallery', async (req, res) => {
    try {
        const galleryItems = await GalleryItem.find().sort({ createdAt: -1 });
        res.render('admin-gallery', { galleryItems });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST delete a gallery item
router.post('/gallery/delete/:id', async (req, res) => {
    try {
        const item = await GalleryItem.findById(req.params.id);
        if (!item) {
            return res.status(404).send('Item not found');
        }

        // Delete image file from disk if it exists
        if (item.image) {
            const imagePath = path.join(__dirname, '../public', item.image);
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Error deleting gallery image file:', err);
            });
        }

        // Delete from database
        await GalleryItem.findByIdAndDelete(req.params.id);
        res.redirect('/admin/gallery');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting gallery item');
    }
});

// POST delete a member
router.post('/delete/:id', async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).send('Member not found');
        }

        // Delete image file from disk if it exists
        if (member.image) {
            const imagePath = path.join(__dirname, '../public', member.image);
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Error deleting image file:', err);
            });
        }

        // Delete from database
        await Member.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting member');
    }
});

module.exports = router;
