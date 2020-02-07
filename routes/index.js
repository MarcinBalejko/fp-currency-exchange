const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    name: req.user.name,
    email: req.user.email,
    capital: req.user.capital,
    gbp_capital: req.user.gbp_capital,
    eur_capital: req.user.eur_capital,
    usd_capital: req.user.usd_capital,
    czk_capital: req.user.czk_capital,
    pln_capital: req.user.pln_capital
}));



module.exports = router;

