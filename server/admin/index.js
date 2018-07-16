const router = require('express').Router();
const fileUpload = require('express-fileupload');

const functions = require('./functions');
const excel_upload_middleware = require('../utils/excel_upload_middleware');

router.use(fileUpload());

router.post('/add_student', functions.add_student);

router.post(
  '/add_students', 
  excel_upload_middleware, 
  functions.add_students
);

router.post('/add_subject', functions.add_subject);

router.post(
  '/add_subjects', 
  excel_upload_middleware, 
  functions.add_subjects
);

router.post('/add_stud_reg_course', functions.add_stud_reg_course);

router.post(
  '/add_stud_reg_courses', 
  excel_upload_middleware, 
  functions.add_stud_reg_courses
);

router.post(
  '/add_booklet_details',
  excel_upload_middleware, 
  functions.add_booklet_details
);

router.post('/report', functions.get_report);

router.get('/get_branches', functions.get_branches);

module.exports = router;