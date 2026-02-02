const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET downloads page. */
router.get('/downloads', auth, function (req, res, next) {
  res.render('downloads', { title: 'Downloads | iGallery' });
});

/* GET protected page. */
router.get('/protected', function (req, res, next) {
  res.render('index', { title: 'Protected Access | iGallery' });
});

/* GET OS downloads page. */
router.get('/downloads/os', auth, function (req, res, next) {
  res.render('os', { title: 'OS Installer | iGallery' });
});

module.exports = router;
