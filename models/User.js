const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gbp_capital: {
        type: Number,
        default: 100
    },
    eur_capital: {
        type: Number,
        default: 10
    },
    usd_capital: {
        type: Number,
        default: 100
    },
    czk_capital: {
        type: Number,
        default: 200
    },
    pln_capital: {
        type: Number,
        default: 1500
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;