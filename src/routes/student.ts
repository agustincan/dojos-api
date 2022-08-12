import { Router, response } from 'express';
import { StudentAll, StudentAddToSchool, StudentGetOne, StudentByUserGetOne,
  StudentUpdate, updateStudentAvatar } from '../controllers/student.controller';
import { listStudentExams, CreateStudentExam, UpdateStudentExam,
  DeleteStudentExam } from '../controllers/exam.controller';
// import { findDirectorsAll } from '../controllers/school.controller';
import { checkToken } from '../controllers/auth.controller';
import { findDirectorsAll } from '../controllers/school.controller';

const router = Router();

router.get('/', StudentAll);
router.get('/:id', StudentGetOne);
router.get('/byuser/:id', StudentByUserGetOne);
router.post('/', StudentAddToSchool);
router.post('/:id/avatar', updateStudentAvatar);
router.put('/', StudentUpdate);
// exams
router.get('/:id/exams', checkToken, listStudentExams);
router.post('/exam', checkToken, CreateStudentExam);
router.put('/exam/:id', UpdateStudentExam);
router.delete('/exam/:id', DeleteStudentExam);
// directors
router.post('/directors', findDirectorsAll);

export default router;