import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const secretKeyToken = 'lkkjKTFRDSI(/)/$"#$'
export const tokenExpires = '24h'
export const userToken = {
  id:58,
  user: 'secretuser',
  email: 'secretuser@test.com'
}

export function isWorking(req: Request, res: Response) {
  return res.json({ status: "its working" })
}

/*export function createToken() {
  jwt.sign({ userToken }, secretKeyToken, { expiresIn: tokenExpires }, (err, tokenn) => {
    return tokenn
  });
}*/

export function getToken(req:Request, res:Response) {
  jwt.sign({ userToken }, secretKeyToken, { expiresIn: tokenExpires }, (err, token) => {
    return res.json({
      token
    });
  });
}

export function checkToken(req:Request, res:Response, next: NextFunction) {
  //console.log(req.headers)
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    
    //req.token = bearerToken;

    jwt.verify(bearerToken, secretKeyToken, (err, authData) => {
      if(err) {
        res.sendStatus(403)
      } else {
        next()
      }
    });
  } else {
    res.sendStatus(403)
  }

}
