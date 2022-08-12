import { Router } from "express";
import {
  listUsers,
  addUser, 
  updateUser,
  deleteUser,
  getOneUser,
  findUserSchools,
  findUserRootSchools, 
  testToken} from '../controllers/user.controller';

import { checkToken } from '../controllers/auth.controller'


const router = Router();

router.get('/', checkToken, listUsers);
router.get('/:id', checkToken, getOneUser);
router.get('/:id/schools', checkToken, findUserSchools);
router.get('/:id/root-schools', checkToken, findUserRootSchools);
router.get('/', checkToken, listUsers);
//router.post('/login', login);
router.post('/', checkToken, addUser);
//
router.put('/:id', checkToken, updateUser);
//router.patch('/:id', updateUser);
router.delete('/:id', checkToken, deleteUser);

router.post('/test-token', checkToken, testToken)


export default router;