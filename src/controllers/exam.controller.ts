import { Response, Request } from "express";
import { getRepository } from 'typeorm';
import { Student } from "../entity/Student";
import { Exam } from '../entity/Exam';

export async function listStudentExams(req: Request, res:Response) {
  const { id } = req.params
  const repo = getRepository(Exam);
  
  const exa = await repo.createQueryBuilder("exam")
  .innerJoin("exam.student","student")
  .innerJoinAndSelect("exam.graduation","graduation")
  .where("student.id = :id",{ id })
  .getMany();

  try {
    if (exa) {
      return res.json(exa);
    } else {
      return res.status(404).json("Estudiante no existe");
    }
  } catch (err) {
    return res.status(500).json(err)
  }
}

export async function CreateStudentExam(req: Request, res:Response) {
  const repo = getRepository(Exam);
  const newExam = repo.create(req.body);
  try {
    await repo.save(newExam)
    return res.status(200).json(newExam);
  } catch (err) {
    return res.status(500).json(err);
  }
  // repo.save(newExam)
  // .then(() => {
  //   return res.status(200).json(newExam);
  // })
  // .catch(err => {
  //   return res.status(500).json(err);
  // });
}

export function UpdateStudentExam(req: Request, res:Response) {
  res.sendStatus(501);
}

export function DeleteStudentExam(req: Request, res:Response) {
  const repo = getRepository(Exam);
  repo.delete(req.params)
  .then(resp => {
    return res.status(200).json(resp)
  })
  .catch(err => {
    return res.status(500).json(err)
  })
}