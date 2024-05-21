var express = require('express');
var router = express.Router();
const showsCtrl = require('../controllers/shows')

router.get('/:id', showsCtrl.showAnimalShow);
router.post('/:id', showsCtrl.bookAnimalShow)

module.exports = router;
