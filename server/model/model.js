const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add your email']
    },
    favourites: {
        type: [],
        required: [true, 'Need to add data for the item']
    }
})

module.exports = mongoose.model('userSchema', UserSchema);