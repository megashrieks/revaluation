const router = require('express').Router();
const functions = require('./functions');

router.get('/get_student_info', functions.get_student_info);

router.post('/send_mail', functions.send_mail);

router.post('/apply_reval', functions.apply_reval);

module.exports = router;