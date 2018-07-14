const router = require('express').Router();
const functions = require('./functions');

router.get('/get_opted_subjects', functions.get_opted_subjects);

module.exports = router;