const express = require('express');
const router = express.Router();
const animalCtrl = require('../controllers/animals')

// each animal page
router.get('/:id', animalCtrl.showDetail)

module.exports = router;