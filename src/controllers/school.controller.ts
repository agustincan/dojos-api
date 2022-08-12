import { Response, Request } from "express";
import { School } from '../entity/School';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { returnResponse, returnErrorResponse } from "../utils/requestUtils";
import { uploadFileFormidable } from "./upload.controller";
import path from "path";
import STUDENT_DIRECTOR_ID from '../utils/constants';
import { Student } from '../entity/Student';

export async function listAllSchool(req: Request, res: Response){
    console.log(res);
    const result = await getRepository(School).find();
    return res.json(result);
}

export async function getOneSchool(req, res){
    const { id } = req.params;
    try {
        const result = await getRepository(School).findOne(id, { relations: ["users","parent","type","director"] });
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function findSchoolSchools(req, res){
    const { id } = req.params;
    const result = await getRepository(School)
        .findOne(id, 
            { 
                relations: ["childrenSchools"],
                order: {
                    name: "ASC"
                }
            }
        );
    return res.json(result);
}

export async function findSchoolUsers(req, res){
    const { id } = req.params;
    const result = await getRepository(School).findOne(id, { relations: ["users","parent"] });
    return res.json(result.users);
}

export async function listRootSchools(req, res){
    console.log(res);
    const result = await getRepository(School).find({where: { parent: null }, relations: ["type"]});
    return res.json(result);
}

export async function findSchoolStudents(req: Request, res: Response){
    const { id } = req.params;
    await getRepository(School)
        .createQueryBuilder("school")
        // .leftJoinAndSelect("school.users", "user")
        .innerJoinAndSelect("school.students", "student")
        .leftJoinAndSelect("student.type", "type")
        .where("school.id = :id", { id })
        .getOne()
        .then(resu => {
            return res.json(resu.students);
        })
        .catch(err => {
            return res.json(err);
        });
}

export async function findSchoolDirectors(req: Request, res: Response){
    const { id } = req.params;
    await getRepository(School)
        .createQueryBuilder("school")
        .select(["student.id, student.fullName"])
        //.leftJoinAndSelect("school.parent", "parent")
        .innerJoinAndSelect("school.students", "student")
        .leftJoinAndSelect("student.type", "type")
        .where("school.id = :id AND student.type.id = 3", { id })
        .getOne()
        .then(resu => {
            return res.json(resu.students);
        })
        .catch(err => {
            return res.json(err);
        });
}

export async function findDirectorsAll(req, res) {
    getRepository(Student).find({
        select: ["id","lastName","firstName"],
        where: {
            type: {
                id: STUDENT_DIRECTOR_ID
            }
        },
        order: {
            lastName: "ASC",
            firstName: "ASC"
        }
    })
    .then(stu => {
        res.json(stu)
    })
    .catch(err => {
        returnErrorResponse(res, '', err)
    })
}

export async function addSchool(req, res) {
    const repo = getRepository(School);
    const { name, address, parentid, userId } = req.body;
    let schoolExist = null
    await repo.findOne({ name, parent: parentid || null }, { relations: ["parent"] })
    .then(school => {
        console.log(school)
        schoolExist = school
    }).catch(ex => {
        res.json({ 
            message: "addSchool error",
            error: ex.message
        });
    })
    if(schoolExist){
        res.status(406).json({ 
            message: `Escuela ${name} ya existe para el usuario ${schoolExist.id}`
        });
    }else{
        const userr = await getRepository(User).findOne({id: userId});
        if(userr){
            let newObj = repo.create();
            newObj.name = name;
            newObj.address = address;
            newObj.parent = parentid;
            newObj.users = [userr];

            await repo.save(newObj);
            res.json({ 
                message: "add school",
                data: newObj
            });
        }else{
            console.log("no existe usuario");
            res.json({ 
                error: "no existe usuario",
                data: null
            });
        }
    }
}

export async function updateSchool(req, res){
    const { id, name, address, parentid, type, director } = req.body;
    const repo = getRepository(School);
    
    let schoolToUpdate = await repo.findOne({id});
    if(!schoolToUpdate){
        const parentObj = await repo.findOne(parentid)
        schoolToUpdate = new School();
        schoolToUpdate.parent = parentObj
        repo.create(schoolToUpdate);
    }
    
    schoolToUpdate.name = name;
    schoolToUpdate.address = address;
    schoolToUpdate.type = type;
    schoolToUpdate.director = director || null;

    const result = await repo.save(schoolToUpdate);
    return res.json(result);
}

export async function updateSchoolAvatar(req: Request, res: Response){
    const id = parseInt(req.params.id);
    if(id && id > 0) {
        uploadFileFormidable(req, res)
        .then(filesPromise => {
            const repo = getRepository(School)
            repo.findOne(id)
                .then(schoolToUpdate => {
                    const fullPath = Object.values(filesPromise)[0].path
                    schoolToUpdate.avatar = path.basename(fullPath)
                    console.log(schoolToUpdate)
                    const result = repo.save(schoolToUpdate)
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

export async function deleteSchool(req, res){
    const repo = getRepository(School);
    console.log(req.body);
    const { id } = req.params;
    await repo.delete(id)
    res.send("delete school");
}

export async function processShoolUser(req: Request, res: Response) {
    const { schoolId, user } = req.body;
    if(user) {
        const repoSchool = getRepository(School);
        const aSchool = await repoSchool.findOne(schoolId, {relations:["users"]});
        if(aSchool) {
            if(user) {
                const userExists = aSchool.users.find(user.id)
                if(!userExists){
                    aSchool.users.push(user);
                    console.log(aSchool.users);
                    // repoSchool.save(aSchool);
                }
            }
        }
    }
}
