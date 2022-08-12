import { Student } from "../entity/Student";
import { getRepository, getManager, Not } from 'typeorm';
import { Request, Response } from "express";
import { School } from "../entity/School";
import { User } from '../entity/User';
import { uploadFileFormidable } from "./upload.controller";
import path from "path";
import { returnResponse, returnErrorResponse } from '../utils/requestUtils';
import { StudentType } from "../entity/StudentType";
import STUDENT_DIRECTOR_ID from "../utils/constants";

export async function StudentAll(req: Request, res: Response){
  const repo = getRepository(Student);
  await repo.find({isActive: true})
    .then(resu => {
      return res.json(resu);
    })
    .catch(err => {
      return res.json(err);
    });
}

export async function StudentGetOne(req: Request, res: Response){
  const { id, schoolId } = req.params;
  const repo = getRepository(Student);
  await repo.findOne(id, {relations:['user', 'user.roles', 'type']})
    .then(resu => {
      if(resu) {
        if(schoolId) {
          resu.schools = resu.schools.filter(s => s.id == parseInt(schoolId) )
        }
        if(!resu.user) {
          resu.user = new User();
          resu.user.roles = [];
          resu.type = new StudentType()
        }
        return res.json(resu);
      } else {
        return res.status(404).json("Estudiante no encontrado");
      }
    })
    .catch(err => {
      return res.json(err);
    });
}

export async function StudentByUserGetOne(req: Request, res: Response){
  const { id } = req.params; // userId
  const repo = getRepository(Student);
  // await repo.findOne({where: {user}}, {relations:['user']})
  await repo.createQueryBuilder("student")
    .leftJoinAndSelect("student.user", "user")
    .where("user.id = :id", { id })
    //.andWhere("school.parent is null")
    .getOne()
    .then(resu => {
      if(resu) {
        return res.json(resu);
      } else {
        return res.status(404).json("Estudiante no encontrado");
      }
    })
    .catch(err => {
      return res.json(err);
    });
}

export async function StudentUpdate(req: Request, res: Response){
  const { id } = req.body
  const repo = getRepository(Student);
  await repo.findOne(id)
  .then(stu => {
    if(stu) {
      const { type, firstName, lastName, address, addressNumber, birthDate, age, email } = req.body
      stu.type = type || { id:1 } // estudiante
      stu.firstName = firstName
      stu.lastName = lastName
      stu.address = address
      stu.addressNumber = addressNumber
      stu.birthDate = birthDate
      stu.email = email
      stu.age = age
      repo.save(stu)
      .then(resu => {
        return res.status(200).json(resu);
      })
      .catch(err => {
        return res.status(500).json(err.message + ": " + err.detail);
      });
    } else {
      return res.status(404).json("Estudiante no existe");
    }
  }).catch(err => {
    return res.json({err});
  });
}

export async function updateStudentAvatar(req: Request, res: Response){
  const id = parseInt(req.params.id);
  if(id && id > 0) {
      uploadFileFormidable(req, res)
      .then(filesPromise => {
          const repo = getRepository(Student)
          repo.findOne(id)
              .then(objectToUpdate => {
                  const fullPath = Object.values(filesPromise)[0].path
                  objectToUpdate.avatar = path.basename(fullPath)
                  const result = repo.save(objectToUpdate)
                  returnResponse(res, 'Archivo subido y actualizado', result)
              })
              .catch(err => {
                  returnErrorResponse(res, 'Error al actualizar avatar', err)
              })
      })
      .catch(err => {
          returnErrorResponse(res, 'Error al subir archivo', err)
      })   
  } else {
      returnErrorResponse(res, 'El id de escuela para actualizar avatar es inválido', null)
  }
}

export async function StudentAddToSchool(req: Request, res: Response){
  const { firstName, lastName, age, email, birthDate, type, schools } = req.body;
  const schoolId = parseInt(schools[0].id);
  const repo = getRepository(School);
  await repo.findOne({ id: schoolId} , {relations:["students"]})
  .then(aSchool => {
    if (aSchool) {
      const aUser = aSchool.students.find(
        u => u.firstName !== null && u.lastName !== null && 
        u.firstName !== "" && u.lastName !== "" && 
        u.firstName === firstName &&
        u.lastName === lastName);
      if (aUser) {
        return res.send("modificar usuario");
      } else {
        //let newUser = new User();

        let newStudent = getRepository(Student).create();
        //newStudent.user = newUser;
        newStudent.type = type || null;
        newStudent.birthDate = birthDate || null;
        newStudent.firstName = firstName;
        newStudent.lastName = lastName;
        newStudent.age = age || null;
        newStudent.email = email || null;
        aSchool.students.push(newStudent);
        if(newStudent.type && newStudent.type.id === STUDENT_DIRECTOR_ID) {
          aSchool.director = newStudent;
        }
        getManager().transaction(async transactionalEntityManager => {
          //await transactionalEntityManager.save(newUser);
          await transactionalEntityManager.save(newStudent);
          await transactionalEntityManager.save(aSchool);
        }).then(rr => {
          return res.status(200).json(newStudent);
        }).catch(err => {
          return res.status(200).json(err);
        });
      }
      /*if (aUser.student) {
        return res.send("usuario y estudiante existe");
      } else {
        return res.send("crear estudiante");
      }*/
    } else {
      return res.status(404).send("escuela no existe");
    }
  })
  .catch(err => {
    return res.status(500).json(err);
  });

  
}

export async function StudentAddToSchool2(req: Request, res: Response){
  const { firstName, lastName, age, email, birthDate, type, schools } = req.body;
  const schoolId = parseInt(schools[0].id);
  const repo = getRepository(School);
  const aSchool = await repo.findOne({ id: schoolId} , {relations:["students"]});
  try {
    if (aSchool) {
      const aUser = aSchool.students.find(
        u => u.firstName !== null && u.lastName !== null && 
        u.firstName !== "" && u.lastName !== "" && 
        u.firstName === firstName &&
        u.lastName === lastName);
      if (aUser) {
        return res.send("modificar usuario");
      } else {
        let newStudent = getRepository(Student).create();
        newStudent.type = type || null;
        newStudent.birthDate = birthDate || null;
        newStudent.firstName = firstName;
        newStudent.lastName = lastName;
        newStudent.age = age || null;
        newStudent.email = email || null;
        aSchool.students.push(newStudent);
        if(newStudent.type && newStudent.type.id === STUDENT_DIRECTOR_ID) {
          aSchool.director = newStudent;
        }
        getManager().transaction(async transactionalEntityManager => {
          //await transactionalEntityManager.save(newUser);
          await transactionalEntityManager.save(newStudent);
          await transactionalEntityManager.save(aSchool);
        }).then(rr => {
          return res.status(200).json(newStudent);
        }).catch(err => {
          return res.status(200).json(err);
        });
      }
      /*if (aUser.student) {
        return res.send("usuario y estudiante existe");
      } else {
        return res.send("crear estudiante");
      }*/
    } else {
      return res.status(404).send("escuela no existe");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}