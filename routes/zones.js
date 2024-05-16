var express = require('express');
var router = express.Router();
const animalZoneCtrl = require('../controllers/animal-zone')

// zones
router.get('/', function(req, res, next) {
  res.render('./animal-zones/zones');
});

// each zone
router.get('/:zone',animalZoneCtrl.show)

// each animal page
router.get('/:zone/:name', animalZoneCtrl.showDetail)

module.exports = router;