var express = require('express');
var router = express.Router();
const animalCtrl = require('../controllers/animals')

router.get('/', animalCtrl.show);

module.exports = router;
