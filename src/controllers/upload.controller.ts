import { Request, Response, NextFunction } from 'express';
import formidable from "formidable"
import { returnResponse, returnErrorResponse } from '../utils/requestUtils';
import { runInNewContext } from 'vm';
//import multer from 'multer';
//import path from 'path';

/*const storage = multer.diskStorage({
  //destination: path.join(__dirname, '../public/uploads'),
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_DIR)
  },
  filename:  (req: Request, file, cb) => {
      cb(null, file.originalname);
  }
})

export const uploadFileMulter = multer({
  storage: storage,
  limits: {fileSize: 1000000}
}).single('fileup');*/

export function uploadFileAndResponseFormidable(req: Request, res: Response) {
    const filesPromise = uploadFileFormidable(req, res)
    filesPromise.then(files => {
      console.log("files " + files)  
      returnResponse(res, 'Archivo subido', files)
    }).catch(err => {
      returnResponse(res, 'No se subió ningún archivo', err)
    })
}

export function uploadFileAndNextFormidable(req: Request, res: Response, next: NextFunction) {
  const filesPromise = uploadFileFormidable(req, res)
  filesPromise.then(files => {
    console.log("files " + files)  
    //returnResponse(res, 'Archivo subido', files)
  }).catch(err => {
    returnResponse(res, 'No se subió ningún archivo', err)
  })
}

export function uploadFileFormidable(req: Request, res: Response): Promise<formidable.Files> {
  return new Promise((resolve, reject) => {
    let result = null
    let folder = ''
    if(req.params.folder){
      folder = req.params.folder
    }
    const form = new formidable.IncomingForm()
    form.uploadDir = process.env.UPLOAD_DIR + folder
    form.keepExtensions = true
    form.maxFileSize = parseInt(process.env.MAX_FILE_SIZE) * 1024 * 1024
    try {
      form.parse(req, (err, fields, files) => {
        if(err) {
          // returnErrorResponse(res, 'error al subir archivo ', err)
          reject(err)
        }
          console.log('\n-----------')
          console.log('Fields', fields)
          console.log('Received:', Object.keys(files))
          console.log("subió " + Date.now())
          resolve(files)
        })
    } catch (error) {
      reject(error)
    }
  })
}