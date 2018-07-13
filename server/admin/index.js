const router = require('express').Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());

const check_token = require('./check_token');
const functions = require('./functions');
const excel_upload_middleware = require('./utils/excel_upload_middleware');

router.post('/add_student', check_token, functions.add_student);

router.post(
  '/add_students_ex', 
  check_token, 
  excel_upload_middleware, 
  functions.add_students_ex
);

router.post('/add_subject', check_token, functions.add_subject);

router.post(
  '/add_subjects_ex', 
  check_token, 
  excel_upload_middleware, 
  functions.add_subjects_ex
);

router.post('/add_student_courses', check_token, functions.add_student_courses);

router.post(
  '/add_student_courses_ex', 
  check_token,
  excel_upload_middleware, 
  functions.add_student_courses_ex
);

module.exports = router;