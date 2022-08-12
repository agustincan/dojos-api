import { Router } from 'express';
import { listAllSchoolType } from '../controllers/schoolType.controller';

const router = Router();


router.get('/', listAllSchoolType);

export default router;