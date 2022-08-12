import { SchoolType } from "../entity/SchoolType";
import { getRepository } from 'typeorm';
import { Request, Response } from "express";
import { Graduation } from '../entity/Graduation';

export async function listAllGraduations(req: Request, res: Response){
  const result = await getRepository(Graduation).find();
  return res.json(result);
}