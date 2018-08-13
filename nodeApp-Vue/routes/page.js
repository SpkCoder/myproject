var express = require('express');
var router = express.Router();

/* page */
router.get('/', function(req, res, next) {
  res.send('page');
});

module.exports = router;
