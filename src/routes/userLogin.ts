import { Router } from "express";
import {
  login } from '../controllers/user.controller';
import { checkToken } from "../controllers/auth.controller";

const router = Router();

router.post('/', login);

export default router;