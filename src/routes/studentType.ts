import { Router } from 'express';
import { listAllStudentType } from '../controllers/studentType.controller';

const router = Router();

router.get('/', listAllStudentType);

export default router;