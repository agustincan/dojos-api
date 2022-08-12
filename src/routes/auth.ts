import { Router } from 'express';
import { isWorking, getToken } from '../controllers/auth.controller';

const router = Router();

router.get('/', isWorking);
router.post('/token', getToken);

export default router;