var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const showsCtrl = require('../controllers/shows')

router.get('/:id', showsCtrl.showAnimalShow);
router.post('/:id', ensureLoggedIn, showsCtrl.bookAnimalShow)

module.exports = router;
