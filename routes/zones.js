var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('./animal-zones/zones');
});

module.exports = router;