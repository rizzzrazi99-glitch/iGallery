const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    image: {
        type: String,
        trim: true
    },
    age: {
        type: Number
    },
    profession: {
        type: String,
        trim: true
    },
    place: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Member', memberSchema);
