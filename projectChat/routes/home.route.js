const express = require('express');
const router = express.Router();
const { getHome } = require('../controllers/home.controllers');

router.get('/', getHome);

module.exports = router