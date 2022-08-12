import { User } from '../entity/User';
import { Request, Response } from "express";
import { getRepository, getConnection} from 'typeorm';
import { School } from '../entity/School';
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { userToken, secretKeyToken, tokenExpires } from './auth.controller'
import { UserRole } from '../entity/UserRole';

const hSalt = 12

export async function testToken(req:Request, res:Response) {  
    res.json({
        message: 'Post created...'
    });
}

export async function listUsers(req: Request, res: Response){
    await getRepository(User).find()
        .then(result => {
            return res.json(result)
        })
        .catch(ex => {
            console.log("error");
            return res.json({ex});
        });
}

export async function listRoles(req: Request, res: Response){
    await getRepository(UserRole).find()
        .then(result => {
            return res.json(result)
        })
        .catch(ex => {
            console.log(ex);
            return [];
        });
}

export async function getOneUser(req:Request, res: Response){
    const { id } = req.params;
    getRepository(User).findOne(id)
    .then(user => {
        delete user?.password
        return res.json(user);
    })
    .catch(err => {
        return res.status(500).json(err);
    });
}

export async function login(req:Request, res: Response){
    const { userName, password } = req.body;
    const repo = getRepository(User)
    repo.findOne({ userName }, {select: ["id","userName","password"]})
    .then(aUser => {
        if(aUser){
            bcrypt.compare(password || '', aUser.password || '').then(resu => {
                if(resu) {
                    // jwt.sign({userToken}, secretKeyToken, { expiresIn: tokenExpires }, (err, tokenn) => {
                    jwt.sign({userToken}, secretKeyToken, (err, tokenn) => {
                        if(typeof tokenn !== 'undefined'){
                            // res.header['authorization'] = tokenn
                            return res.json({ id: aUser.id, error: '', token: tokenn })
                        }else{
                            return res.status(500).json({ id: aUser.id, message: 'token vacío', token: tokenn })
                        }
                    });
                } else {
                    return res.status(401).json({ id: 0, message: 'Contraseña inválida' })
                }
            }).catch(ex => {
                return res.json({id: 0, message: ex});
            })
        } else {
            return res.status(404).json({id: 0, message: 'No existe usuario'})
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({message: err})
    })
}

export async function getUserById(id)
{
    const result = await getRepository(User).findOne(id);
    return result;
}

export async function addUser(req, res) {
    const repo = getRepository(User);
    const { schools, userName, password, student, role } = req.body;
    if(!schools){
        return res.json({ 
            error: "no tiene escuela al crear usuario"
        })
    }
    const userExist = await repo.findOne({ userName });
    if(userExist){
        return res.json({ 
            error: "usuario existe"
        });
    }else{
        let newUser = repo.create({
            userName, isActive: true, student
        });
        newUser.schools = schools
        newUser.roles = [ role || {id: 3} ] // estudiante
        if(password) {
            bcrypt.hash(password, hSalt).then(hPass => {
                newUser.password = hPass
                repo.save(newUser)
                .then(data => {
                    delete newUser.password
                    return res.json({ 
                        message: "usuario agregado",
                        id: data.id
                    });
                })
                .catch(err => {
                    return res.json({ 
                        message: "error al crear usuario",
                        error: err.detail
                    });
                });
            })
        }else {
            return res.json({ 
                error: "usuario no posee contraseña"
            });
        }
        
    }
}

export async function updateUser(req, res){
    const repo = getRepository(User);
    const { id, isActive, roles } = req.body;
    
    let aUser = await repo.findOne(id, {relations:['roles']});
    aUser.isActive = isActive;
    if(aUser.roles) {
        if(aUser.roles.length == 0) {
            let defRole = new UserRole();
            defRole.id = 3
            aUser.roles = [defRole]
        } else {
            aUser.roles = roles
        }
    } else {
        let defRole = new UserRole();
        defRole.id = 3
        aUser.roles = [defRole]
    }
    
    await repo.save(aUser)
    .then(data => {
        return res.json({ 
            message: "update user",
            data
        });
    })
    .catch(err => {
        return res.json({ 
            message: "update user error",
            error: err.detail
        });
    });
}

export async function deleteUser(req, res){
    const result = await getRepository(User).delete(req.params.id)
    return res.json(result);
}

// schools
export async function findUserRootSchools(req, res: Response){
    const { id } = req.params;
    try {
        const userSchools = await getRepository(School)
        .createQueryBuilder("school")
        .leftJoin("school.users", "users")
        .leftJoinAndSelect("school.type", "type")
        .leftJoinAndSelect("school.director", "director")
        .where("users.id = :id", { id })
        .andWhere("school.parent is null")
        .getMany();
        
        return res.json(userSchools);    
    } catch (err) {
        return res.status(500).json(err);    
    }
}

export async function findUserSchools(req, res: Response){
    const { id } = req.params;
    const a_user = await getRepository(User).findOne(id, {relations: ["schools"]});
    return res.json(a_user.schools);
}