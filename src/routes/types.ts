import { Router } from 'express';
import { listAllSchoolType } from '../controllers/schoolType.controller';
import { listAllGraduations } from '../controllers/types.controller';
import { listRoles } from '../controllers/user.controller';

const router = Router();


router.get('/graduations', listAllGraduations);
router.get('/roles', listRoles);

export default router;