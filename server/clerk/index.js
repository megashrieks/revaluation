const router = require('express').Router();
const modifyRevalStatus = require('./functions/modifyRevalStatus');
const getAppliedStudents = require('./functions/getAppliedStudents');

// { usn: "" }
router.post('/approve', modifyRevalStatus);

// { usn: "" }
router.post('/disapprove', modifyRevalStatus);

router.get('/appliedStudents', getAppliedStudents);

module.exports = router;