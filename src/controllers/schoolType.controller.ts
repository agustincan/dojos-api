import { SchoolType } from "../entity/SchoolType";
import { getRepository } from 'typeorm';
import { Request, Response } from "express";

export async function listAllSchoolType(req: Request, res: Response){
  const result = await getRepository(SchoolType).find({isActive: true});
  return res.json(result);
}