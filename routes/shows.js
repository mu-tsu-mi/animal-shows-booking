var express = require('express');
var router = express.Router();
const showsCtrl = require('../controllers/shows')

router.get('/:animalShowName', showsCtrl.showAnimalShow);


module.exports = router;
