require('dotenv').config();
const mongoose = require('mongoose');
const Member = require('./models/Member');
const GalleryItem = require('./models/GalleryItem');

async function checkDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const members = await Member.find({}, 'name image');
        console.log('\n--- Members ---');
        members.forEach(m => console.log(`${m.name}: ${m.image}`));

        const galleryItems = await GalleryItem.find({}, 'title image');
        console.log('\n--- Gallery Items ---');
        galleryItems.forEach(i => console.log(`${i.title}: ${i.image}`));

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkDB();
