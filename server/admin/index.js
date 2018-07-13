const router = require('express').Router();
const fileUpload = require('express-fileupload');

const check_token = require('./utils/check_token');
const functions = require('./functions');
const excel_upload_middleware = require('./utils/excel_upload_middleware');

router.use(fileUpload());

router.post('/add_student', check_token, functions.add_student);

router.post(
  '/add_students', 
  check_token, 
  excel_upload_middleware, 
  functions.add_students
);

router.post('/add_subject', check_token, functions.add_subject);

router.post(
  '/add_subjects', 
  check_token, 
  excel_upload_middleware, 
  functions.add_subjects
);

router.post(
  '/add_stud_reg_course', 
  check_token, 
  functions.add_stud_reg_course
);

router.post(
  '/add_stud_reg_courses', 
  check_token,
  excel_upload_middleware, 
  functions.add_stud_reg_courses
);

router.post(
  '/add_booklet_details', 
  check_token,
  excel_upload_middleware, 
  functions.add_booklet_details
);

router.post(
  '/report',
  check_token,
  functions.get_report
)

module.exports = router;