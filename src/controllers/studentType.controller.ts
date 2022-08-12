import { StudentType } from "../entity/StudentType";
import { getRepository } from 'typeorm';
import { Request, Response } from "express";

export async function listAllStudentType(req: Request, res: Response){
  const result = await getRepository(StudentType).find({isActive: true});
  return res.json(result);
}