const router = require('express').Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());

const check_token = require('./check_token');
const functions = require('./functions');

router.get('/add_student', check_token, functions.add_student);

router.get('/add_students_ex', check_token, functions.add_students_ex);

module.exports = router;