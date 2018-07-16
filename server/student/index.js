const router = require('express').Router();
const functions = require('./functions');

router.get('/get_opted_subjects', functions.get_opted_subjects);

router.post('/send_mail', functions.send_mail);

router.get('/apply_reval', functions.apply_reval);

module.exports = router;