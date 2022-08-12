import { Router } from "express";
import { listAllSchool, getOneSchool, addSchool, updateSchool, deleteSchool, findSchoolSchools,
  findSchoolUsers,
  listRootSchools,
  processShoolUser,
  findSchoolStudents,
  updateSchoolAvatar, 
  findSchoolDirectors,
  findDirectorsAll} from "../controllers/school.controller";
import { checkToken } from "../controllers/auth.controller";
import { StudentAll, StudentUpdate } from "../controllers/student.controller";
import { uploadFileAndResponseFormidable } from "../controllers/upload.controller";

const router = Router();

router.get('/', checkToken, listAllSchool);
router.get('/:id', checkToken, getOneSchool);
// schools
router.get('/:id/schools', checkToken, findSchoolSchools);
router.get('/:id/root-schools', checkToken, listRootSchools);
router.post('/', checkToken, addSchool);
router.put('/:id', checkToken, updateSchool);
router.post('/:id/avatar', updateSchoolAvatar);
//router.post('/:id/avatar', updateSchoolAvatar);
router.delete('/:id', checkToken, deleteSchool);
// users
router.get('/:id/users', checkToken, findSchoolUsers);
router.put('/:id/process-user', checkToken, processShoolUser);
// students
router.get('/:id/students', findSchoolStudents);
// directors
router.get('/:id/directors', findSchoolDirectors);
router.post('/directors', findDirectorsAll);
// events

export default router;