const router = require('express').Router();

router.get('/check_auth', require('./functions/check_auth'));

router.post('/login', require('./functions/login'));

module.exports = router;