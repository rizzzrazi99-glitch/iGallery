var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET downloads page. */
router.get('/downloads', function (req, res, next) {
  if (req.cookies.vault_unlocked === 'true') {
    res.render('downloads', { title: 'Downloads | iGallery' });
  } else {
    res.redirect('/');
  }
});

/* GET protected page. */
router.get('/protected', function (req, res, next) {
  res.render('index', { title: 'Protected Access | iGallery' });
});

/* GET OS downloads page. */
router.get('/downloads/os', function (req, res, next) {
  if (req.cookies.vault_unlocked === 'true') {
    res.render('os', { title: 'OS Installer | iGallery' });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
